import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import * as THREE from 'three';
import { Vector3, Raycaster } from 'three';
import { GameContext } from './GameContext';
import { TextureContext } from './AssetLoader';

const Player = ({ camera }) => {
  const { gameState, setGameState } = React.useContext(GameContext);
  const playerRef = useRef();
  const velocity = useRef([0, 0, 0]);
  const playerSpeed = 5;
  const [isGrounded, setIsGrounded] = useState(false);
  const jumpCooldown = useRef(0);
  const raycaster = useRef(new Raycaster());
  
  // Player physics body
  const [ref, api] = useBox(() => ({
    mass: 70,
    position: [0, 5, 0], // Start a bit higher to ensure it lands on the ground
    args: [0.5, 1.8, 0.5], // Player dimensions (width, height, depth)
    material: {
      friction: 0.7
    },
    linearDamping: 0.95, // Add damping to prevent sliding
    onCollide: (e) => {
      // Check if collision is with the ground or floor
      if (e.contact.bi.id === e.body.id && e.contact.ni[1] > 0.5) {
        setIsGrounded(true);
      }
    }
  }));
  
  // Subscribe to player movement (position, rotation)
  useEffect(() => {
    const unsubPosition = api.position.subscribe(v => {
      setGameState(prev => ({
        ...prev,
        playerPosition: v
      }));
    });
    
    const unsubRotation = api.rotation.subscribe(r => {
      setGameState(prev => ({
        ...prev,
        playerRotation: r
      }));
    });
    
    return () => {
      unsubPosition();
      unsubRotation();
    };
  }, [api, setGameState]);

  // Handle keyboard controls for player movement
  const moveDirection = useRef({ forward: false, backward: false, left: false, right: false, jump: false });
  
  useEffect(() => {
    // Skip controls if player is in a vehicle
    if (gameState.inVehicle) return;
    
    const handleKeyDown = (e) => {
      switch (e.code) {
        case 'KeyW':
          moveDirection.current.forward = true;
          break;
        case 'KeyS':
          moveDirection.current.backward = true;
          break;
        case 'KeyA':
          moveDirection.current.left = true;
          break;
        case 'KeyD':
          moveDirection.current.right = true;
          break;
        case 'Space':
          moveDirection.current.jump = true;
          break;
        case 'KeyE':
          // Try to enter a vehicle
          tryEnterVehicle();
          break;
        default:
          break;
      }
    };
    
    const handleKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW':
          moveDirection.current.forward = false;
          break;
        case 'KeyS':
          moveDirection.current.backward = false;
          break;
        case 'KeyA':
          moveDirection.current.left = false;
          break;
        case 'KeyD':
          moveDirection.current.right = false;
          break;
        case 'Space':
          moveDirection.current.jump = false;
          break;
        default:
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState.inVehicle]);
  
  // Function to check if player is near a vehicle and enter it
  const tryEnterVehicle = () => {
    // Check if near any vehicle
    const playerPos = new Vector3(...gameState.playerPosition);
    
    for (const vehicle of gameState.vehicles) {
      const vehiclePos = new Vector3(...vehicle.position);
      const distance = playerPos.distanceTo(vehiclePos);
      
      if (distance < 3) { // If player is within 3 units of a vehicle
        setGameState(prev => ({
          ...prev,
          inVehicle: true,
          currentVehicle: vehicle
        }));
        break;
      }
    }
  };
  
  // Update player movement each frame
  useFrame((state, delta) => {
    if (gameState.inVehicle) {
      // When in vehicle, do not control player directly
      return;
    }
    
    // Apply player movement based on keyboard input
    const direction = new Vector3();
    
    // Get camera direction for movement relative to view
    const cameraDirection = new Vector3();
    camera.getWorldDirection(cameraDirection);
    cameraDirection.y = 0;
    cameraDirection.normalize();
    
    // Calculate move directions relative to camera
    const rightVector = new Vector3();
    rightVector.crossVectors(camera.up, cameraDirection).normalize();
    
    if (moveDirection.current.forward) {
      direction.add(cameraDirection.clone().multiplyScalar(playerSpeed));
    }
    if (moveDirection.current.backward) {
      direction.add(cameraDirection.clone().multiplyScalar(-playerSpeed));
    }
    if (moveDirection.current.left) {
      direction.add(rightVector.clone().multiplyScalar(-playerSpeed));
    }
    if (moveDirection.current.right) {
      direction.add(rightVector.clone().multiplyScalar(playerSpeed));
    }
    
    // Apply movement velocity
    if (direction.length() > 0) {
      direction.normalize().multiplyScalar(playerSpeed);
      api.velocity.set(direction.x, velocity.current[1], direction.z);
    } else {
      api.velocity.set(0, velocity.current[1], 0);
    }
    
    // Jump - only if grounded
    if (moveDirection.current.jump && isGrounded && jumpCooldown.current <= 0) {
      api.velocity.set(velocity.current[0], 8, velocity.current[2]);
      setIsGrounded(false);
      jumpCooldown.current = 20; // 20 frames cooldown (about 1/3 second)
    }
    
    // Decrease jump cooldown
    if (jumpCooldown.current > 0) {
      jumpCooldown.current--;
    }
    
    // Check for ground using velocity
    if (!isGrounded) {
      // If vertical velocity is very small, consider the player grounded
      if (Math.abs(velocity.current[1]) < 0.1) {
        setIsGrounded(true);
      }
      
      // Force ground state after initial spawn
      if (gameState.playerPosition[1] < 1.0) {
        setIsGrounded(true);
      }
    }
    
    // Update camera position to follow player
    camera.position.x = gameState.playerPosition[0];
    camera.position.y = gameState.playerPosition[1] + 1.8; // Eye level
    camera.position.z = gameState.playerPosition[2];
  });
  
  // Only render player model when not in a vehicle
  if (gameState.inVehicle) return null;
  
  return (
    <mesh ref={ref} castShadow>
      {/* Basic player model - replace with proper character model in production */}
      <boxGeometry args={[0.5, 1.8, 0.5]} />
      <meshStandardMaterial color="#ff4433" />
    </mesh>
  );
};

export default Player;
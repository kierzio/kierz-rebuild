import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import * as THREE from 'three';
import { Vector3, Quaternion } from 'three';
import { GameContext } from './GameContext';
import { TextureContext } from './AssetLoader';

// Helper function to calculate safe exit position from vehicle
const calculateSafeExitPosition = (vehiclePosition, vehicleRotation) => {
  // Calculate a position at the side of the vehicle (2 units to the right)
  const sideOffset = new Vector3(2, 0, 0);
  const euler = new THREE.Euler(vehicleRotation[0], vehicleRotation[1], vehicleRotation[2], 'XYZ');
  const quaternion = new Quaternion().setFromEuler(euler);
  sideOffset.applyQuaternion(quaternion);
  
  // Return position slightly above ground to avoid sinking
  return [
    vehiclePosition[0] + sideOffset.x,
    vehiclePosition[1] + 1, // Ensure player is above ground
    vehiclePosition[2] + sideOffset.z
  ];
};

// Individual Vehicle Component
const Vehicle = ({ data, isControlled, camera }) => {
  const { id, type, position, rotation } = data;
  const { gameState, setGameState } = React.useContext(GameContext);
  
  // Vehicle physics body
  const [ref, api] = useBox(() => ({
    mass: 1500,
    position,
    rotation,
    args: getVehicleDimensions(type), // Get size based on vehicle type
    material: { friction: 0.1 }
  }));
  
  // Get vehicle dimensions based on type
  function getVehicleDimensions(type) {
    switch (type) {
      case 'sedan':
        return [2, 1.5, 4.5];
      case 'suv':
        return [2.2, 1.8, 5];
      case 'sports':
        return [2, 1.2, 4.8];
      default:
        return [2, 1.5, 4.5];
    }
  }
  
  // Vehicle controls if this is the controlled vehicle
  const vehicleControls = useRef({ forward: false, backward: false, left: false, right: false });
  const vehicleSpeed = useRef(0);
  const maxSpeed = type === 'sports' ? 15 : (type === 'suv' ? 12 : 10);
  const acceleration = type === 'sports' ? 5 : (type === 'suv' ? 4 : 3);
  const handling = type === 'sports' ? 1.5 : (type === 'suv' ? 0.8 : 1);
  
  useEffect(() => {
    if (!isControlled) return;
    
    const handleKeyDown = (e) => {
      switch (e.code) {
        case 'KeyW':
          vehicleControls.current.forward = true;
          break;
        case 'KeyS':
          vehicleControls.current.backward = true;
          break;
        case 'KeyA':
          vehicleControls.current.left = true;
          break;
        case 'KeyD':
          vehicleControls.current.right = true;
          break;
        case 'KeyE':
          // Exit vehicle with safe positioning
          const exitPosition = calculateSafeExitPosition(position, rotation);
          
          setGameState(prev => ({
            ...prev,
            inVehicle: false,
            currentVehicle: null,
            playerPosition: exitPosition,
          }));
          break;
        default:
          break;
      }
    };
    
    const handleKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW':
          vehicleControls.current.forward = false;
          break;
        case 'KeyS':
          vehicleControls.current.backward = false;
          break;
        case 'KeyA':
          vehicleControls.current.left = false;
          break;
        case 'KeyD':
          vehicleControls.current.right = false;
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
  }, [isControlled, setGameState]);
  
  // Subscribe to vehicle position and rotation
  useEffect(() => {
    if (isControlled) {
      const unsubPosition = api.position.subscribe(v => {
        setGameState(prev => {
          // Update the current vehicle's position in the vehicles array
          const updatedVehicles = prev.vehicles.map(vehicle => 
            vehicle.id === id ? { ...vehicle, position: v } : vehicle
          );
          
          return {
            ...prev,
            vehicles: updatedVehicles,
            // Also update player position to match vehicle when inside
            playerPosition: [v[0], v[1] + 0.5, v[2]] // Seat position
          };
        });
      });
      
      const unsubRotation = api.rotation.subscribe(r => {
        setGameState(prev => {
          // Update the current vehicle's rotation in the vehicles array
          const updatedVehicles = prev.vehicles.map(vehicle => 
            vehicle.id === id ? { ...vehicle, rotation: r } : vehicle
          );
          
          return {
            ...prev,
            vehicles: updatedVehicles
          };
        });
      });
      
      return () => {
        unsubPosition();
        unsubRotation();
      };
    }
  }, [api, id, isControlled, setGameState]);
  
  // AI controls for non-player vehicles
  const aiControls = useRef({
    targetPosition: new Vector3(),
    waypoints: [],
    currentWaypoint: 0,
    waitTime: 0
  });
  
  // Initialize AI waypoints for vehicles on the road network
  useEffect(() => {
    if (!isControlled) {
      // Simple road-following AI
      aiControls.current.waypoints = [
        new Vector3(30, 0, 0),
        new Vector3(30, 0, 30),
        new Vector3(-30, 0, 30),
        new Vector3(-30, 0, -30),
        new Vector3(30, 0, -30),
      ];
      
      aiControls.current.currentWaypoint = Math.floor(Math.random() * aiControls.current.waypoints.length);
      aiControls.current.targetPosition = aiControls.current.waypoints[aiControls.current.currentWaypoint];
    }
  }, [isControlled]);
  
  useFrame((state, delta) => {
    if (isControlled) {
      // Player-controlled vehicle logic
      let forward = 0;
      let steering = 0;
      
      // Calculate acceleration
      if (vehicleControls.current.forward) {
        forward = acceleration * delta;
      } else if (vehicleControls.current.backward) {
        forward = -acceleration * delta;
      } else {
        // Apply braking/coasting
        forward = vehicleSpeed.current > 0 ? -acceleration * 0.5 * delta : 
                (vehicleSpeed.current < 0 ? acceleration * 0.5 * delta : 0);
      }
      
      // Update speed
      vehicleSpeed.current += forward;
      vehicleSpeed.current = Math.max(-maxSpeed * 0.5, Math.min(maxSpeed, vehicleSpeed.current));
      
      // Decelerate if no input
      if (!vehicleControls.current.forward && !vehicleControls.current.backward) {
        vehicleSpeed.current *= 0.98;
        if (Math.abs(vehicleSpeed.current) < 0.1) vehicleSpeed.current = 0;
      }
      
      // Calculate steering
      if (vehicleControls.current.left) {
        steering = -handling * delta * (vehicleSpeed.current > 0 ? 1 : -1);
      } else if (vehicleControls.current.right) {
        steering = handling * delta * (vehicleSpeed.current > 0 ? 1 : -1);
      }
      
      // Apply rotation
      if (Math.abs(vehicleSpeed.current) > 0.1) {
        api.rotation.set(
          rotation[0],
          rotation[1] + steering,
          rotation[2]
        );
      }
      
      // Apply movement in the direction of rotation
      const direction = new Vector3(0, 0, vehicleSpeed.current);
      const euler = new THREE.Euler(rotation[0], rotation[1], rotation[2], 'XYZ');
      const quaternion = new Quaternion().setFromEuler(euler);
      direction.applyQuaternion(quaternion);
      
      api.velocity.set(direction.x, direction.y, direction.z);
      
      // Update camera to follow vehicle
      if (camera) {
        // Position camera behind vehicle
        const cameraOffset = new Vector3(0, 2, -5); // Behind and above vehicle
        cameraOffset.applyQuaternion(quaternion);
        
        camera.position.x = position[0] + cameraOffset.x;
        camera.position.y = position[1] + cameraOffset.y;
        camera.position.z = position[2] + cameraOffset.z;
        
        // Look at vehicle
        camera.lookAt(position[0], position[1] + 1, position[2]);
      }
      
      // Update vehicle data in game state with current speed
      setGameState(prev => {
        const updatedVehicles = prev.vehicles.map(vehicle => 
          vehicle.id === id ? { ...vehicle, speed: Math.abs(vehicleSpeed.current) * 10 } : vehicle
        );
        
        const updatedCurrentVehicle = prev.currentVehicle ? 
          { ...prev.currentVehicle, speed: Math.abs(vehicleSpeed.current) * 10 } : null;
        
        return {
          ...prev,
          vehicles: updatedVehicles,
          currentVehicle: updatedCurrentVehicle
        };
      });
    } else {
      // AI vehicle logic
      const currentPosition = new Vector3(position[0], position[1], position[2]);
      const targetPosition = aiControls.current.targetPosition;
      
      // Check if vehicle has reached the current waypoint
      const distanceToTarget = currentPosition.distanceTo(targetPosition);
      
      if (distanceToTarget < 5) {
        // Move to next waypoint
        aiControls.current.currentWaypoint = (aiControls.current.currentWaypoint + 1) % aiControls.current.waypoints.length;
        aiControls.current.targetPosition = aiControls.current.waypoints[aiControls.current.currentWaypoint];
        aiControls.current.waitTime = 30; // Wait 30 frames at intersection
      }
      
      // Only move if not waiting at intersection
      if (aiControls.current.waitTime <= 0) {
        // Direction to target
        const directionToTarget = new Vector3().subVectors(targetPosition, currentPosition).normalize();
        
        // Current forward direction
        const forward = new Vector3(0, 0, 1);
        const euler = new THREE.Euler(rotation[0], rotation[1], rotation[2], 'XYZ');
        const quaternion = new Quaternion().setFromEuler(euler);
        forward.applyQuaternion(quaternion);
        
        // Angle between current direction and target direction
        let dot = forward.dot(directionToTarget);
        dot = Math.max(-1, Math.min(1, dot)); // Clamp to avoid floating point errors
        let angle = Math.acos(dot);
        
        // Determine steering direction (left or right)
        const cross = new Vector3().crossVectors(forward, directionToTarget);
        const steerDir = Math.sign(cross.y);
        
        // Apply AI steering and acceleration
        const aiSpeed = 5; // Constant speed for simplicity
        const aiSteering = steerDir * Math.min(angle * 0.5, 0.03);
        
        api.rotation.set(rotation[0], rotation[1] + aiSteering, rotation[2]);
        api.velocity.set(forward.x * aiSpeed, forward.y * aiSpeed, forward.z * aiSpeed);
      } else {
        // Waiting at intersection, slow down
        api.velocity.set(0, 0, 0);
        aiControls.current.waitTime--;
      }
    }
  });
  
  // Determine color based on vehicle type
  const getVehicleColor = () => {
    switch (type) {
      case 'sedan':
        return '#3333dd';
      case 'suv':
        return '#33dd33';
      case 'sports':
        return '#dd3333';
      default:
        return '#dddddd';
    }
  };
  
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={getVehicleDimensions(type)} />
      <meshStandardMaterial color={getVehicleColor()} />
    </mesh>
  );
};

// Main Vehicles component that renders all vehicles in the game
const Vehicles = () => {
  const { gameState } = React.useContext(GameContext);
  const { camera } = useThree();
  
  return (
    <>
      {gameState.vehicles.map(vehicle => (
        <Vehicle 
          key={vehicle.id}
          data={vehicle}
          isControlled={gameState.inVehicle && gameState.currentVehicle?.id === vehicle.id}
          camera={gameState.inVehicle && gameState.currentVehicle?.id === vehicle.id ? camera : null}
        />
      ))}
    </>
  );
};

export default Vehicles;
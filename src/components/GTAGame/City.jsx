import React, { useMemo, useContext } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { usePlane, useBox } from '@react-three/cannon';
import * as THREE from 'three';
import { TextureContext } from './AssetLoader';

// Building Component
const Building = ({ position, size, type }) => {
  const textures = useContext(TextureContext);
  const [ref] = useBox(() => ({
    type: 'static',
    position,
    args: size,
    material: { friction: 0.1 }
  }));
  
  // Get building color or texture
  const color = textures.building && textures.building[type] 
    ? textures.building[type].color 
    : getBuildingColor(type);
    
  return (
    <mesh ref={ref} position={position} receiveShadow castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Get color based on building type
const getBuildingColor = (type) => {
  switch(type) {
    case 'skyscraper1':
      return '#1a1a2e';
    case 'skyscraper2':
      return '#16213e';
    case 'skyscraper3':
      return '#0f3460';
    case 'residential1':
      return '#233554';
    case 'residential2':
      return '#2a3b4c';
    default:
      return '#1e293b';
  }
};

// Road Component
const Road = ({ start, end, width }) => {
  const [ref] = usePlane(() => ({ 
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0.01, 0], // Slightly above ground to prevent z-fighting
    material: { friction: 0.5 }
  }));

  // Calculate road mesh based on start and end points
  const roadLength = Math.sqrt(
    Math.pow(end[0] - start[0], 2) + 
    Math.pow(end[2] - start[2], 2)
  );
  
  const rotation = Math.atan2(end[2] - start[2], end[0] - start[0]);
  const midPoint = [
    (start[0] + end[0]) / 2,
    0.01, // Slightly above ground
    (start[2] + end[2]) / 2
  ];

  return (
    <mesh ref={ref} position={midPoint} rotation={[0, rotation, 0]} receiveShadow>
      <planeGeometry args={[roadLength, width]} />
      <meshStandardMaterial color="#222222">
        <primitive attach="map" object={new THREE.DataTexture(new Uint8Array([20, 20, 20]), 1, 1, THREE.RGBFormat)} />
      </meshStandardMaterial>
    </mesh>
  );
};

// Ground Component
const Ground = () => {
  const [ref] = usePlane(() => ({ 
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    material: { friction: 0.5 }
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[500, 500]} />
      <meshStandardMaterial color="#131313">
        <primitive attach="map" object={new THREE.DataTexture(new Uint8Array([15, 15, 15]), 1, 1, THREE.RGBFormat)} />
      </meshStandardMaterial>
    </mesh>
  );
};

// City Component - Composition of buildings, roads, and ground
const City = () => {
  // Define city layout - buildings, roads, etc.
  const buildings = [
    // Skyscrapers
    { position: [20, 15, 20], size: [10, 30, 10], type: 'skyscraper1' },
    { position: [35, 20, 20], size: [10, 40, 10], type: 'skyscraper2' },
    { position: [20, 25, 35], size: [10, 50, 10], type: 'skyscraper3' },
    
    // Residential buildings
    { position: [-20, 5, 20], size: [8, 10, 8], type: 'residential1' },
    { position: [-30, 5, 30], size: [8, 10, 8], type: 'residential2' },
    { position: [-40, 5, 20], size: [8, 10, 8], type: 'residential1' },
    { position: [-20, 5, 40], size: [8, 10, 8], type: 'residential2' },
  ];
  
  // Simplified roads - just a crossroads in the center
  const roads = [
    { start: [-50, 0, 0], end: [50, 0, 0], width: 12 },
    { start: [0, 0, -50], end: [0, 0, 50], width: 12 },
  ];

  return (
    <>
      {/* Ground with visible color and physics */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[500, 500]} />
        <meshStandardMaterial color="#1e1e1e" />
      </mesh>
      
      {/* We've moved the physics floor to the main component */}
      
      {/* Render all buildings */}
      {buildings.map((building, index) => (
        <Building 
          key={index}
          position={building.position}
          size={building.size}
          type={building.type}
        />
      ))}
      
      {/* Render visible roads */}
      {roads.map((road, index) => (
        <mesh 
          key={index}
          position={[
            (road.start[0] + road.end[0]) / 2,
            0.05, // Slightly above ground
            (road.start[2] + road.end[2]) / 2
          ]}
          rotation={[
            -Math.PI / 2, 
            Math.atan2(road.end[2] - road.start[2], road.end[0] - road.start[0]), 
            0
          ]}
          receiveShadow
        >
          <planeGeometry args={[
            Math.sqrt(
              Math.pow(road.end[0] - road.start[0], 2) + 
              Math.pow(road.end[2] - road.start[2], 2)
            ), 
            road.width
          ]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      ))}
      
      {/* Add a car in the center */}
      <group position={[5, 0.75, 5]} castShadow>
        {/* Car body */}
        <mesh castShadow>
          <boxGeometry args={[2, 1.5, 4.5]} />
          <meshStandardMaterial color="#cc3333" />
        </mesh>
        
        {/* Car roof */}
        <mesh position={[0, 0.9, -0.5]} castShadow>
          <boxGeometry args={[1.8, 0.8, 2.2]} />
          <meshStandardMaterial color="#aa1111" />
        </mesh>
        
        {/* Wheels */}
        <mesh position={[1.1, -0.5, 1.5]} rotation={[Math.PI/2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        <mesh position={[-1.1, -0.5, 1.5]} rotation={[Math.PI/2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        <mesh position={[1.1, -0.5, -1.5]} rotation={[Math.PI/2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        <mesh position={[-1.1, -0.5, -1.5]} rotation={[Math.PI/2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </group>
      
      {/* Add a blue sports car */}
      <group position={[-15, 0.6, -5]} rotation={[0, Math.PI / 4, 0]} castShadow>
        {/* Car body */}
        <mesh castShadow>
          <boxGeometry args={[2, 1.2, 4.8]} />
          <meshStandardMaterial color="#3333cc" />
        </mesh>
        
        {/* Car hood (sloped) */}
        <mesh position={[0, 0.5, 1.2]} castShadow>
          <boxGeometry args={[1.9, 0.4, 2]} />
          <meshStandardMaterial color="#2222aa" />
        </mesh>
        
        {/* Car windshield/roof (sloped) */}
        <mesh position={[0, 0.8, -0.2]} castShadow>
          <boxGeometry args={[1.8, 0.5, 2]} />
          <meshStandardMaterial color="#111199" />
        </mesh>
        
        {/* Wheels */}
        <mesh position={[1.1, -0.4, 1.5]} rotation={[Math.PI/2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        <mesh position={[-1.1, -0.4, 1.5]} rotation={[Math.PI/2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        <mesh position={[1.1, -0.4, -1.5]} rotation={[Math.PI/2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        <mesh position={[-1.1, -0.4, -1.5]} rotation={[Math.PI/2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </group>
    </>
  );
};

export default City;
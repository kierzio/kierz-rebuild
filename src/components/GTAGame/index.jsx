import React, { useEffect, useRef, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Physics, usePlane } from '@react-three/cannon';
import { Sky, PointerLockControls, Html } from '@react-three/drei';

import City from './City';
import Player from './Player';
import Vehicles from './Vehicles';
import AssetLoader from './AssetLoader';
import { GameProvider, GameContext } from './GameContext';

// Main Game Component
const GTAGame = () => {
  const canvasRef = useRef();
  
  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      // Responsive handling code
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <GameProvider>
      <div className="game-container" style={{ width: '100%', height: '100vh' }}>
        <Canvas 
          ref={canvasRef}
          shadows 
          camera={{ position: [0, 5, 15], fov: 60 }}
          dpr={[1, 2]} // Optimize for different pixel ratios
        >
          <Suspense fallback={
            <Html center>
              <div className="bg-cyber-dark/90 p-4 rounded-md text-neon-blue text-center">
                <p className="font-orbitron">Loading Game Engine...</p>
              </div>
            </Html>
          }>
            <fog attach="fog" args={['#272730', 30, 100]} />
            <ambientLight intensity={0.7} />
            <directionalLight 
              position={[10, 10, 5]} 
              intensity={1} 
              castShadow 
              shadow-mapSize-width={1024} 
              shadow-mapSize-height={1024}
            />
            <hemisphereLight intensity={0.4} groundColor="#000000" />
            <Physics 
              defaultContactMaterial={{ friction: 0.5 }}
              gravity={[0, -30, 0]} // Stronger gravity
            >
              <AssetLoader>
                <Scene />
              </AssetLoader>
              
              {/* Invisible physics floor - using usePlane for better physics */}
              <Floor />
            </Physics>
            <PointerLockControls />
          </Suspense>
        </Canvas>
        <GameHUD />
        
        {/* Game instructions */}
        <div className="absolute right-4 bottom-20 z-50 bg-cyber-dark/80 backdrop-blur-sm border border-neon-blue/30 p-4 rounded-md text-white max-w-xs">
          <h3 className="text-neon-blue mb-2 font-bold">Night City GTA Controls:</h3>
          <ul className="text-sm space-y-1">
            <li>• <span className="text-neon-purple">WASD</span> - Move around</li>
            <li>• <span className="text-neon-purple">Mouse</span> - Look around</li>
            <li>• <span className="text-neon-purple">E</span> - Interact with vehicles</li>
            <li>• <span className="text-neon-purple">Space</span> - Jump</li>
            <li>• <span className="text-neon-purple">ESC</span> - Release mouse pointer</li>
          </ul>
          <p className="mt-2 text-xs text-gray-300">
            Find the red and blue vehicles in the city and press E to drive them!
          </p>
        </div>
      </div>
    </GameProvider>
  );
};

// Game Scene Component
const Scene = () => {
  const { camera } = useThree();
  
  return (
    <>
      <Sky sunPosition={[100, 10, 100]} />
      <City />
      <Player camera={camera} />
      <Vehicles />
    </>
  );
};

// Heads-up Display Component
const GameHUD = () => {
  const { gameState } = React.useContext(GameContext);
  
  return (
    <div className="game-hud" style={{ position: 'absolute', top: 20, left: 20, color: 'white' }}>
      {gameState && gameState.inVehicle ? (
        <div>
          <p>Vehicle: {gameState.currentVehicle.type}</p>
          <p>Speed: {Math.round(gameState.currentVehicle.speed)} km/h</p>
        </div>
      ) : (
        <p>Press E near a vehicle to enter</p>
      )}
    </div>
  );
};

// Physical floor component
const Floor = () => {
  const [ref] = usePlane(() => ({ 
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    type: 'static',
    material: { friction: 0.5 }
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial visible={false} />
    </mesh>
  );
};

export default GTAGame;
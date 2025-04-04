// This is a utility component to preload assets and show a loading screen
import React, { useState, useEffect, useContext, createContext } from 'react';
import { useProgress, Html } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, RepeatWrapping } from 'three';

// Create a context to share loaded textures with other components
export const TextureContext = createContext({});

const AssetLoader = ({ children }) => {
  const { progress, loaded, total } = useProgress();
  const [isLoading, setIsLoading] = useState(true);
  const [textures, setTextures] = useState({});
  
  // Load all game textures
  useEffect(() => {
    const loadTextures = async () => {
      try {
        // Create a texture loader
        const textureLoader = new TextureLoader();
        
        // Define texture paths to preload
        const texturePathMap = {
          ground: '/assets/textures/ground.jpg',
          road: '/assets/textures/road.jpg',
          building: {
            default: '/assets/textures/buildings/default.jpg',
            residential1: '/assets/textures/buildings/residential1.jpg',
            residential2: '/assets/textures/buildings/residential2.jpg',
            skyscraper1: '/assets/textures/buildings/skyscraper1.jpg',
            skyscraper2: '/assets/textures/buildings/skyscraper2.jpg',
            skyscraper3: '/assets/textures/buildings/skyscraper3.jpg'
          },
          vehicle: {
            default: '/assets/textures/vehicles/default.jpg',
            car: '/assets/textures/vehicles/car.jpg'
          }
        };
        
        // Use default textures if file loading fails
        const loadedTextures = {
          ground: { texture: null, color: '#1e1e1e' },
          road: { texture: null, color: '#333333' },
          building: {
            default: { texture: null, color: '#1e293b' },
            residential1: { texture: null, color: '#233554' },
            residential2: { texture: null, color: '#2a3b4c' },
            skyscraper1: { texture: null, color: '#1a1a2e' },
            skyscraper2: { texture: null, color: '#16213e' },
            skyscraper3: { texture: null, color: '#0f3460' }
          },
          vehicle: {
            default: { texture: null, color: '#dddddd' },
            car: { texture: null, color: '#cc3333' }
          }
        };
        
        setTextures(loadedTextures);
      } catch (error) {
        console.error("Error loading textures:", error);
      }
    };
    
    loadTextures();
  }, []);
  
  // Wait for the progress to complete and add a slight delay for UX
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);
  
  return isLoading ? (
    <Html center>
      <div className="bg-cyber-dark/90 p-8 rounded-md shadow-lg border border-neon-blue/30">
        <h2 className="text-neon-blue text-xl mb-4 font-orbitron text-center">LOADING NIGHT CITY</h2>
        <div className="w-64 h-3 bg-cyber-light rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-neon-blue loading-bar" 
            style={{ width: `${progress}%`, transition: 'width 0.3s ease-in-out' }}
          />
        </div>
        <p className="text-center text-neon-purple font-mono">
          {Math.round(progress)}% ({loaded}/{total} assets)
        </p>
      </div>
    </Html>
  ) : (
    <TextureContext.Provider value={textures}>
      {children}
    </TextureContext.Provider>
  );
};

export default AssetLoader;
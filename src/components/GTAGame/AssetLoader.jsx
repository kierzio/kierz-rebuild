// This is a utility component to preload assets and show a loading screen
import React, { useState, useEffect, createContext } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// Create a context to share loaded textures with other components
export const TextureContext = createContext({});

const AssetLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [total] = useState(8); // Total number of "assets" to simulate loading
  const [textures, setTextures] = useState({});
  
  // Simulate loading progress since we're not actually loading many real assets
  useEffect(() => {
    let timer;
    let currentProgress = 0;
    
    // Simple function to create a color texture
    const createColorTexture = (color) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
      
      return { texture, color };
    };
    
    // Create color-based textures
    const loadedTextures = {
      ground: createColorTexture('#1e1e1e'),
      road: createColorTexture('#333333'),
      building: {
        default: createColorTexture('#1e293b'),
        residential1: createColorTexture('#233554'),
        residential2: createColorTexture('#2a3b4c'),
        skyscraper1: createColorTexture('#1a1a2e'),
        skyscraper2: createColorTexture('#16213e'),
        skyscraper3: createColorTexture('#0f3460')
      },
      vehicle: {
        default: createColorTexture('#dddddd'),
        car: createColorTexture('#cc3333')
      }
    };
    
    setTextures(loadedTextures);
    
    // Simulate loading progress
    const simulateLoading = () => {
      timer = setInterval(() => {
        currentProgress += 1;
        setLoaded(Math.min(Math.floor(currentProgress / 100 * total), total));
        setLoadingProgress(Math.min(currentProgress, 100));
        
        if (currentProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      }, 50);
    };
    
    simulateLoading();
    
    return () => {
      clearInterval(timer);
    };
  }, [total]);
  
  return isLoading ? (
    <Html center>
      <div className="bg-cyber-dark/90 p-8 rounded-md shadow-lg border border-neon-blue/30">
        <h2 className="text-neon-blue text-xl mb-4 font-orbitron text-center">LOADING NIGHT CITY</h2>
        <div className="w-64 h-3 bg-cyber-light rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-neon-blue loading-bar" 
            style={{ width: `${loadingProgress}%`, transition: 'width 0.3s ease-in-out' }}
          />
        </div>
        <p className="text-center text-neon-purple font-mono">
          {Math.round(loadingProgress)}% ({loaded}/{total} assets)
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
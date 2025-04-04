import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import GTAGame from "../components/GTAGame";
import "../styles/global.css";

/**
 * Game page for the GTA-style Three.js game
 * Renders a full-screen canvas for the Three.js game
 */
const GamePage = ({ location }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [gameProgress, setGameProgress] = useState(33);
  const loadingIntervalRef = useRef(null);

  // Simulate loading progress
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Start loading process
      loadingIntervalRef.current = setInterval(() => {
        setGameProgress(prev => {
          const newProgress = prev + Math.floor(Math.random() * 10);
          if (newProgress >= 100) {
            clearInterval(loadingIntervalRef.current);
            
            // Delay a bit before showing the game
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
            
            return 100;
          }
          return newProgress;
        });
      }, 300);
      
      return () => {
        if (loadingIntervalRef.current) {
          clearInterval(loadingIntervalRef.current);
        }
      };
    }
  }, []);

  return (
    <Layout location={location} hideNavigation={true}>
      <div className="game-container relative w-full h-screen">
        {/* Game component */}
        {!isLoading && <GTAGame />}
        
        {/* Game UI overlay - always visible */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-50">
          <Link 
            to="/" 
            className="cyber-btn bg-cyber-dark/80 backdrop-blur-sm px-4 py-2 text-neon-blue border border-neon-blue/50 hover:bg-neon-blue/10 transition-all duration-300 rounded-sm flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Portfolio
          </Link>
          
          <div className="stats bg-cyber-dark/80 backdrop-blur-sm px-4 py-2 border border-neon-purple/50 text-neon-purple rounded-sm">
            <span className="font-orbitron">NIGHT CITY GTA</span>
          </div>
        </div>
        
        {/* Game controls help - shown when game is active */}
        {!isLoading && (
          <div className="absolute bottom-0 left-0 w-full p-4 z-50 bg-cyber-dark/70 backdrop-blur-sm border-t border-neon-blue/30">
            <div className="container mx-auto text-neon-blue text-sm flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-2">
                <span className="text-white">Move:</span>
                <kbd className="px-2 py-1 bg-cyber-light rounded-sm">W</kbd>
                <kbd className="px-2 py-1 bg-cyber-light rounded-sm">A</kbd>
                <kbd className="px-2 py-1 bg-cyber-light rounded-sm">S</kbd>
                <kbd className="px-2 py-1 bg-cyber-light rounded-sm">D</kbd>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">Jump:</span>
                <kbd className="px-2 py-1 bg-cyber-light rounded-sm">Space</kbd>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">Enter/Exit Vehicle:</span>
                <kbd className="px-2 py-1 bg-cyber-light rounded-sm">E</kbd>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">Look:</span>
                <span className="text-neon-purple">Mouse</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Loading screen - only visible while loading */}
        {isLoading && (
          <div className="absolute inset-0 bg-cyber-dark flex flex-col items-center justify-center z-30">
            <h1 className="text-4xl md:text-6xl font-bold text-neon-blue font-orbitron mb-8">
              NIGHT CITY GTA
            </h1>
            <div className="w-64 h-2 bg-cyber-light rounded-full overflow-hidden mb-8">
              <div 
                className="h-full bg-neon-blue loading-bar transition-all duration-300"
                style={{ width: `${gameProgress}%` }}
              ></div>
            </div>
            <p className="text-neon-purple font-orbitron text-lg animate-pulse">
              Loading game assets... {gameProgress}%
            </p>
            <p className="mt-8 text-gray-400 max-w-md text-center">
              A cyberpunk GTA-style experience built with Three.js. 
              Navigate the neon streets of Night City in this tech demo.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GamePage;

export const Head = () => (
  <>
    <title>Night City GTA | kierz.io</title>
    <meta name="description" content="Cyberpunk GTA-style game experience built with Three.js" />
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet" />
  </>
);
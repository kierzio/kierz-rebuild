import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import SnakeGame from "../components/SnakeGame";
import "../styles/global.css";

/**
 * Game page for the Nokia Snake game
 * A nostalgic recreation of the classic Snake game
 */
const GamePage = ({ location }) => {
  const [score, setScore] = useState(0);

  // Handle score updates from the game component
  const handleScoreUpdate = (newScore) => {
    setScore(newScore);
  };

  // Handle game over event
  const handleGameOver = (finalScore) => {
    console.log("Game over with score:", finalScore);
  };

  return (
    <Layout location={location} hideNavigation={true}>
      <div className="game-container relative w-full h-screen flex items-center justify-center bg-cyber-dark">
        <div className="max-w-4xl mx-auto relative bg-cyber-dark border-4 border-neon-blue/70 rounded-md shadow-lg shadow-neon-blue/20 overflow-hidden">
          {/* Game header */}
          <div className="bg-cyber-dark p-4 border-b border-neon-blue/50 flex justify-between items-center">
            <Link 
              to="/" 
              className="cyber-btn px-4 py-2 text-neon-blue border border-neon-blue/50 hover:bg-neon-blue/10 transition-all duration-300 rounded-sm flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </Link>
            
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-orbitron text-neon-purple">
                NOKIA SNAKE
              </h1>
              <p className="text-neon-blue text-sm">Retro Edition</p>
            </div>
            
            <div className="px-4 py-2 opacity-0">
              {/* Empty div to maintain layout balance */}
              <span className="font-orbitron">Placeholder</span>
            </div>
          </div>
          
          {/* Game area */}
          <div className="relative">
            <SnakeGame 
              onScoreUpdate={handleScoreUpdate}
              onGameOver={handleGameOver}
            />
          </div>
          
          {/* Game controls */}
          <div className="bg-cyber-dark p-4 border-t border-neon-blue/50">
            <div className="text-center text-sm text-gray-400">
              <p>Controls: Arrow Keys or WASD | <span className="text-neon-blue">P</span> to Pause</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GamePage;

export const Head = () => (
  <>
    <title>Nokia Snake | kierz.io</title>
    <meta name="description" content="Play the classic Nokia Snake game with a cyberpunk twist" />
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet" />
  </>
);
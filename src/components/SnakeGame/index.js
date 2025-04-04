import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

// Simple isolated Nokia Snake game implementation
const SnakeGame = ({ onScoreUpdate, onGameOver }) => {
  // Game constants
  const GRID_SIZE = 25;
  const CELL_SIZE = 15;
  const MOVE_INTERVAL = 170; // ms between moves (higher = slower)
  
  // Game state
  const [gameState, setGameState] = useState({
    running: true,
    gameOver: false,
    paused: false,
    score: 0,
    highScore: 0
  });
  
  // Refs for game objects that don't need to trigger re-renders
  const canvasRef = useRef(null);
  const snakeRef = useRef([{ x: 3, y: 10 }, { x: 2, y: 10 }, { x: 1, y: 10 }]);
  const foodRef = useRef({ x: 15, y: 10 });
  const directionRef = useRef({ x: 1, y: 0 }); // Initial direction: right
  const gameLoopRef = useRef(null);
  
  // On mount, initialize game and load high score
  useEffect(() => {
    console.log("Game component mounted");
    const savedHighScore = localStorage.getItem('snakeHighScore') || 0;
    setGameState(prev => ({ 
      ...prev, 
      highScore: parseInt(savedHighScore, 10) 
    }));
    
    // Setup canvas
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = GRID_SIZE * CELL_SIZE;
      canvas.height = GRID_SIZE * CELL_SIZE;
      canvas.focus(); // Ensure canvas can receive keyboard events
    }
    
    // Place initial food
    randomizeFood();
    
    // Start game
    startGame();
    
    // Cleanup on unmount
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    };
  }, []);
  
  // Place food in a random location not occupied by the snake
  const randomizeFood = () => {
    const snake = snakeRef.current;
    let newFood;
    
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    foodRef.current = newFood;
  };
  
  // Start a new game
  const startGame = () => {
    console.log("Starting new game");
    
    // Clear any existing game loop
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
    
    // Reset snake
    snakeRef.current = [{ x: 3, y: 10 }, { x: 2, y: 10 }, { x: 1, y: 10 }];
    
    // Reset direction
    directionRef.current = { x: 1, y: 0 };
    
    // Reset game state
    setGameState(prev => ({
      ...prev,
      running: true,
      gameOver: false,
      paused: false,
      score: 0
    }));
    
    // Notify parent of score reset
    onScoreUpdate && onScoreUpdate(0);
    
    // Generate new food
    randomizeFood();
    
    // Start game loop with a slight delay to ensure state is updated
    setTimeout(() => {
      // Draw the initial state
      drawGame();
      
      // Start the game loop
      gameLoopRef.current = setInterval(gameLoop, MOVE_INTERVAL);
    }, 50);
  };
  
  // Pause/resume the game
  const togglePause = () => {
    setGameState(prev => {
      const newPaused = !prev.paused;
      return { ...prev, paused: newPaused };
    });
  };
  
  // Handle game over
  const endGame = () => {
    console.log("Game over");
    
    // Stop the game loop
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
    
    // Update state
    setGameState(prev => {
      // Check for high score
      const newHighScore = prev.score > prev.highScore ? prev.score : prev.highScore;
      
      // Update localStorage if we have a new high score
      if (prev.score > prev.highScore) {
        localStorage.setItem('snakeHighScore', prev.score.toString());
      }
      
      return {
        ...prev,
        running: false,
        gameOver: true,
        highScore: newHighScore
      };
    });
    
    // Notify parent
    onGameOver && onGameOver(gameState.score);
    
    // Force redraw to show game over screen immediately
    setTimeout(() => drawGame(), 10);
  };
  
  // Main game loop
  const gameLoop = () => {
    // Don't update if game is paused or over
    if (gameState.paused || gameState.gameOver) return;
    
    const snake = snakeRef.current;
    const food = foodRef.current;
    const direction = directionRef.current;
    
    // Create new head position
    const head = snake[0];
    const newHead = {
      x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
      y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE
    };
    
    // Check for collision with self
    if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
      endGame();
      return;
    }
    
    // Move snake: add new head
    snake.unshift(newHead);
    
    // Check for food collision
    let ate = false;
    if (newHead.x === food.x && newHead.y === food.y) {
      // Don't remove tail - snake grows
      ate = true;
      
      // Update score
      setGameState(prev => {
        const newScore = prev.score + 1;
        onScoreUpdate && onScoreUpdate(newScore);
        return { ...prev, score: newScore };
      });
      
      // Place new food
      randomizeFood();
    } else {
      // Remove tail - snake just moves
      snake.pop();
    }
    
    // Draw the updated game state
    drawGame();
  };
  
  // Draw the current game state on the canvas
  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const snake = snakeRef.current;
    const food = foodRef.current;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = '#8bac0f'; // Nokia green background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    snake.forEach((segment, index) => {
      // Head is darker than body
      ctx.fillStyle = index === 0 ? '#0f380f' : '#306230';
      
      // Draw segment
      ctx.fillRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
      
      // Add pixel effect
      ctx.strokeStyle = '#9bbc0f';
      ctx.strokeRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
    });
    
    // Draw food
    ctx.fillStyle = '#0f380f';
    ctx.fillRect(
      food.x * CELL_SIZE,
      food.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
    
    // Add pixel effect to food
    ctx.strokeStyle = '#9bbc0f';
    ctx.strokeRect(
      food.x * CELL_SIZE + 1,
      food.y * CELL_SIZE + 1,
      CELL_SIZE - 2,
      CELL_SIZE - 2
    );
    
    // Draw pause overlay if paused
    if (gameState.paused) {
      ctx.fillStyle = 'rgba(15, 56, 15, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#9bbc0f';
      ctx.font = '16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2 - 10);
      ctx.fillText('Press P to resume', canvas.width / 2, canvas.height / 2 + 20);
    }
    
    // Draw game over overlay
    if (gameState.gameOver) {
      console.log("Drawing game over screen");
      
      ctx.fillStyle = 'rgba(15, 56, 15, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#9bbc0f';
      ctx.font = '20px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40);
      
      // Show score
      ctx.fillText(`Score: ${gameState.score}`, canvas.width / 2, canvas.height / 2 - 10);
      
      // Show high score
      ctx.fillText(`High Score: ${gameState.highScore}`, canvas.width / 2, canvas.height / 2 + 20);
      
      // Show new high score message if applicable
      if (gameState.score >= gameState.highScore && gameState.score > 0) {
        ctx.fillStyle = '#ff9bbc'; // Highlight color for new high score
        ctx.fillText('NEW HIGH SCORE!', canvas.width / 2, canvas.height / 2 + 50);
      }
      
      ctx.fillStyle = '#9bbc0f';
      ctx.font = '16px monospace';
      ctx.fillText('Press SPACE to restart', canvas.width / 2, canvas.height / 2 + 80);
    }
  };
  
  // Change snake direction
  const changeDirection = (dx, dy) => {
    const currentDirection = directionRef.current;
    
    // Don't allow 180-degree turns (moving in the opposite direction)
    if ((dx === 1 && currentDirection.x === -1) ||
        (dx === -1 && currentDirection.x === 1) ||
        (dy === 1 && currentDirection.y === -1) ||
        (dy === -1 && currentDirection.y === 1)) {
      return;
    }
    
    directionRef.current = { x: dx, y: dy };
  };
  
  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent default for game control keys
      if ([32, 37, 38, 39, 40, 80, 87, 65, 83, 68].includes(e.keyCode)) {
        e.preventDefault();
      }
      
      // Space bar - restart game if game over
      if (e.keyCode === 32 && gameState.gameOver) {
        console.log("Space pressed during game over, restarting game");
        startGame();
        return;
      }
      
      // P key - toggle pause if game is not over
      if (e.keyCode === 80 && !gameState.gameOver) {
        togglePause();
        return;
      }
      
      // Don't process movement keys if game is paused or over
      if (gameState.paused || gameState.gameOver) return;
      
      // Arrow keys / WASD
      switch (e.keyCode) {
        case 38: // Up arrow
        case 87: // W key
          changeDirection(0, -1);
          break;
        case 40: // Down arrow
        case 83: // S key
          changeDirection(0, 1);
          break;
        case 37: // Left arrow
        case 65: // A key
          changeDirection(-1, 0);
          break;
        case 39: // Right arrow
        case 68: // D key
          changeDirection(1, 0);
          break;
      }
    };
    
    // Attach event listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState]); // Re-create when gameState changes to ensure latest state is used
  
  // Re-draw game when state changes
  useEffect(() => {
    drawGame();
  }, [gameState]);
  
  // Mobile control handlers
  const handleDirectionButtonClick = (dx, dy) => {
    if (gameState.gameOver) {
      startGame();
      return;
    }
    
    if (gameState.paused) return;
    
    changeDirection(dx, dy);
  };
  
  const handlePauseButtonClick = () => {
    if (gameState.gameOver) {
      startGame();
    } else {
      togglePause();
    }
  };
  
  return (
    <div className="snake-game">
      <div className="game-stats flex justify-between items-center w-full mb-2 px-2">
        <div className="score font-mono text-neon-blue">
          Score: <span className="text-neon-purple">{gameState.score}</span>
        </div>
        <div className="high-score font-mono text-neon-blue">
          High Score: <span className="text-neon-purple">{gameState.highScore}</span>
        </div>
      </div>
      
      <canvas 
        ref={canvasRef} 
        className="game-canvas"
        tabIndex="0" // Make canvas focusable for keyboard events
        style={{ border: '2px solid #9bbc0f', maxWidth: '100%' }}
      />
      
      {gameState.gameOver && (
        <button 
          className="restart-btn mt-4 px-6 py-3 bg-neon-blue text-cyber-dark font-bold rounded-md hover:bg-neon-purple transition-colors duration-300"
          onClick={startGame}
        >
          START NEW GAME
        </button>
      )}
      
      {/* Mobile controls */}
      <div className="mobile-controls">
        <div className="d-pad">
          <button 
            className="d-pad-btn up" 
            onClick={() => handleDirectionButtonClick(0, -1)}
          >
            ▲
          </button>
          <button 
            className="d-pad-btn left" 
            onClick={() => handleDirectionButtonClick(-1, 0)}
          >
            ◄
          </button>
          <button 
            className="d-pad-btn right" 
            onClick={() => handleDirectionButtonClick(1, 0)}
          >
            ►
          </button>
          <button 
            className="d-pad-btn down" 
            onClick={() => handleDirectionButtonClick(0, 1)}
          >
            ▼
          </button>
        </div>
        
        <button 
          className="pause-btn"
          onClick={handlePauseButtonClick}
        >
          {gameState.gameOver ? 'Start New Game' : (gameState.paused ? 'Resume' : 'Pause')}
        </button>
      </div>
    </div>
  );
};

export default SnakeGame;
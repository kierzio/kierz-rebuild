import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

// Basic Snake Game with simple direct DOM manipulation for performance
const SnakeGame = ({ onScoreUpdate, onGameOver }) => {
  // Game constants
  const GRID_SIZE = 25;
  const CELL_SIZE = 15;
  const MOVE_INTERVAL = 130; // ms between moves (higher = slower)
  
  // Refs for game objects
  const canvasRef = useRef(null);
  const snakeRef = useRef([{ x: 3, y: 10 }, { x: 2, y: 10 }, { x: 1, y: 10 }]); // Initial snake
  const foodRef = useRef({ x: 15, y: 10 });
  const directionRef = useRef({ x: 1, y: 0 }); // Start moving right
  const moveIntervalRef = useRef(null);
  const scoreRef = useRef(0);
  const gameActiveRef = useRef(false);
  const highScoreRef = useRef(0);
  
  // Use state for UI updates only
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  // Initialize game
  useEffect(() => {
    // Setup canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = GRID_SIZE * CELL_SIZE;
    canvas.height = GRID_SIZE * CELL_SIZE;
    
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('snakeHighScore');
    if (savedHighScore) {
      highScoreRef.current = parseInt(savedHighScore);
      setHighScore(highScoreRef.current);
    }
    
    // Place food randomly
    randomizeFood();
    
    // Start game automatically
    startGame();
    
    // Clean up on unmount
    return () => {
      stopGame();
    };
  }, []);
  
  // Start the game loop
  const startGame = () => {
    if (gameActiveRef.current) return;
    
    gameActiveRef.current = true;
    gameOver && setGameOver(false);
    
    // Reset score if game was over
    if (gameOver) {
      scoreRef.current = 0;
      setScore(0);
      onScoreUpdate && onScoreUpdate(0);
      
      // Reset snake
      snakeRef.current = [{ x: 3, y: 10 }, { x: 2, y: 10 }, { x: 1, y: 10 }];
      directionRef.current = { x: 1, y: 0 };
      randomizeFood();
    }
    
    // Start game loop
    clearInterval(moveIntervalRef.current);
    moveIntervalRef.current = setInterval(gameLoop, MOVE_INTERVAL);
  };
  
  // Stop the game loop
  const stopGame = () => {
    gameActiveRef.current = false;
    clearInterval(moveIntervalRef.current);
  };
  
  // Place food randomly
  const randomizeFood = () => {
    let newFood;
    const snake = snakeRef.current;
    
    // Make sure food doesn't appear on snake
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    foodRef.current = newFood;
  };
  
  // Main game loop
  const gameLoop = () => {
    if (isPaused) return;
    
    const snake = snakeRef.current;
    const food = foodRef.current;
    const direction = directionRef.current;
    
    // Create new head in current direction
    const head = snake[0];
    const newHead = {
      x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
      y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE
    };
    
    // Check for collision with self
    if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
      handleGameOver();
      return;
    }
    
    // Insert new head at the beginning of snake
    snake.unshift(newHead);
    
    // Check for food collision
    if (newHead.x === food.x && newHead.y === food.y) {
      // Grow snake (don't remove tail)
      // Increase score
      scoreRef.current += 1;
      setScore(scoreRef.current);
      onScoreUpdate && onScoreUpdate(scoreRef.current);
      
      // Create new food
      randomizeFood();
    } else {
      // Remove tail (snake moves forward)
      snake.pop();
    }
    
    // Draw updated state
    drawGame();
  };
  
  // Handle game over
  const handleGameOver = () => {
    stopGame();
    setGameOver(true);
    
    // Check for new high score
    const currentScore = scoreRef.current;
    if (currentScore > highScoreRef.current) {
      highScoreRef.current = currentScore;
      setHighScore(currentScore);
      // Save to localStorage
      localStorage.setItem('snakeHighScore', currentScore.toString());
    }
    
    onGameOver && onGameOver(currentScore);
  };
  
  // Draw the game state
  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const snake = snakeRef.current;
    const food = foodRef.current;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = '#8bac0f'; // Nokia screen color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    snake.forEach((segment, index) => {
      // Use darker color for head
      ctx.fillStyle = index === 0 ? '#0f380f' : '#306230';
      
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
    if (isPaused) {
      ctx.fillStyle = 'rgba(15, 56, 15, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#9bbc0f';
      ctx.font = '16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2 - 10);
      ctx.fillText('Press P to resume', canvas.width / 2, canvas.height / 2 + 20);
    }
    
    // Draw game over overlay
    if (gameOver) {
      ctx.fillStyle = 'rgba(15, 56, 15, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#9bbc0f';
      ctx.font = '20px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40);
      
      // Show score
      ctx.fillText(`Score: ${scoreRef.current}`, canvas.width / 2, canvas.height / 2 - 10);
      
      // Show high score
      ctx.fillText(`High Score: ${highScoreRef.current}`, canvas.width / 2, canvas.height / 2 + 20);
      
      // Show new high score message if applicable
      if (scoreRef.current >= highScoreRef.current && scoreRef.current > 0) {
        ctx.fillStyle = '#ff9bbc'; // Highlight color for new high score
        ctx.fillText('NEW HIGH SCORE!', canvas.width / 2, canvas.height / 2 + 50);
      }
      
      ctx.fillStyle = '#9bbc0f';
      ctx.font = '16px monospace';
      ctx.fillText('Press SPACE to restart', canvas.width / 2, canvas.height / 2 + 80);
    }
  };
  
  // Event listeners for game controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent default behavior for arrow keys (scrolling)
      if ([32, 37, 38, 39, 40, 80, 87, 65, 83, 68].includes(e.keyCode)) {
        e.preventDefault();
      }
      
      if (gameOver && e.keyCode === 32) {
        // Restart game on SPACE when game over
        startGame();
        return;
      }
      
      if (e.keyCode === 80) { // P key
        setIsPaused(!isPaused);
        return;
      }
      
      // Don't change direction if paused
      if (isPaused) return;
      
      const currentDirection = directionRef.current;
      
      switch (e.keyCode) {
        case 38: // Up arrow
        case 87: // W key
          if (currentDirection.y !== 1) { // Not going down
            directionRef.current = { x: 0, y: -1 };
          }
          break;
        case 40: // Down arrow
        case 83: // S key
          if (currentDirection.y !== -1) { // Not going up
            directionRef.current = { x: 0, y: 1 };
          }
          break;
        case 37: // Left arrow
        case 65: // A key
          if (currentDirection.x !== 1) { // Not going right
            directionRef.current = { x: -1, y: 0 };
          }
          break;
        case 39: // Right arrow
        case 68: // D key
          if (currentDirection.x !== -1) { // Not going left
            directionRef.current = { x: 1, y: 0 };
          }
          break;
      }
    };
    
    // Add event listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPaused, gameOver]);
  
  // Ensure game is drawn when component mounts
  useEffect(() => {
    drawGame();
  }, [isPaused, gameOver, score]);
  
  // Mobile controls functions
  const handleDirectionButtonClick = (dx, dy) => {
    const currentDirection = directionRef.current;
    
    // Don't allow movement in opposite direction
    if ((dx === 1 && currentDirection.x === -1) || 
        (dx === -1 && currentDirection.x === 1) || 
        (dy === 1 && currentDirection.y === -1) || 
        (dy === -1 && currentDirection.y === 1)) {
      return;
    }
    
    directionRef.current = { x: dx, y: dy };
    
    // Restart game if game over
    if (gameOver) {
      startGame();
    }
  };
  
  const togglePause = () => {
    if (gameOver) {
      startGame();
    } else {
      setIsPaused(!isPaused);
    }
  };
  
  return (
    <div className="snake-game">
      <div className="game-stats flex justify-between items-center w-full mb-2 px-2">
        <div className="score font-mono text-neon-blue">
          Score: <span className="text-neon-purple">{score}</span>
        </div>
        <div className="high-score font-mono text-neon-blue">
          High Score: <span className="text-neon-purple">{highScore}</span>
        </div>
      </div>
      <canvas 
        ref={canvasRef} 
        className="game-canvas"
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        style={{ border: '2px solid #9bbc0f', maxWidth: '100%' }}
      />
      
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
          onClick={togglePause}
        >
          {gameOver ? 'New Game' : (isPaused ? 'Resume' : 'Pause')}
        </button>
      </div>
    </div>
  );
};

export default SnakeGame;
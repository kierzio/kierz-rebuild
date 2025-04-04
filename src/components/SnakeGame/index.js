import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

// Constants for game settings
const GRID_SIZE = 30; // Grid size (30x30) - larger playing field
const CELL_SIZE = 15; // Cell size in pixels - smaller cells to fit on screen
const INITIAL_SNAKE_LENGTH = 3;
const INITIAL_SPEED = 200; // Starting speed in ms - slower initial speed
const MIN_SPEED = 80; // Maximum speed (minimum delay) - not too fast
const SPEED_INCREMENT = 3; // How much to increase speed with each food - more gradual speed increase

// Directions
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

const SnakeGame = ({ onScoreUpdate, onGameOver }) => {
  // Game canvas reference
  const canvasRef = useRef(null);
  
  // Game state
  const [snake, setSnake] = useState([]); // Array of snake segments
  const [food, setFood] = useState({ x: 0, y: 0 }); // Food position
  const [direction, setDirection] = useState(null); // Initial direction is null (waiting for input)
  const [nextDirection, setNextDirection] = useState(null); // Buffer for next direction
  const [gameSpeed, setGameSpeed] = useState(INITIAL_SPEED); // Game speed (ms between updates)
  const [score, setScore] = useState(0); // Player's score
  const [isPaused, setIsPaused] = useState(false); // Pause state
  const [gameLoopInterval, setGameLoopInterval] = useState(null); // Reference to game loop interval
  const [waitingForFirstMove, setWaitingForFirstMove] = useState(true); // Wait for first user input
  
  // Initialize game
  useEffect(() => {
    initGame();
    return () => {
      if (gameLoopInterval) clearInterval(gameLoopInterval);
    };
  }, []);
  
  // Initialize the game state
  const initGame = () => {
    // Create initial snake (three segments at center, pointing right but not moving)
    const initialSnake = [];
    const centerY = Math.floor(GRID_SIZE / 2);
    const startX = Math.floor(GRID_SIZE / 4); // Start on the left side of the grid
    
    // Create snake from right to left (head is at the end of the array)
    for (let i = INITIAL_SNAKE_LENGTH - 1; i >= 0; i--) {
      initialSnake.push({ x: startX - i, y: centerY });
    }
    
    setSnake(initialSnake);
    setDirection(null); // No direction yet - waiting for first input
    setNextDirection(null);
    setGameSpeed(INITIAL_SPEED);
    setScore(0);
    setWaitingForFirstMove(true);
    
    // Place food at random position
    placeFood(initialSnake);
    
    // Clear any existing game loop
    if (gameLoopInterval) clearInterval(gameLoopInterval);
    
    // No game loop is started yet - will start on first key press
    
    // Call score update callback
    if (onScoreUpdate) onScoreUpdate(0);
  };
  
  // Main game loop
  const gameLoop = () => {
    if (isPaused || !direction) return; // Don't move if paused or no direction yet
    
    setSnake(prevSnake => {
      // Update direction from buffer
      setDirection(nextDirection);
      
      // Create new head in the current direction
      const head = prevSnake[prevSnake.length - 1];
      const newHead = {
        x: (head.x + nextDirection.x + GRID_SIZE) % GRID_SIZE, // Wrap around grid
        y: (head.y + nextDirection.y + GRID_SIZE) % GRID_SIZE  // Wrap around grid
      };
      
      // Check collision with self
      const collidesWithSelf = prevSnake.some((segment, index) => 
        // Skip the very last segment of the tail since it will move out of the way
        index < prevSnake.length - 1 && segment.x === newHead.x && segment.y === newHead.y
      );
      
      if (collidesWithSelf) {
        // Game over
        endGame();
        return prevSnake;
      }
      
      // Create new snake array
      const newSnake = [...prevSnake, newHead];
      
      // Check collision with food
      if (newHead.x === food.x && newHead.y === food.y) {
        // Snake grows (don't remove tail)
        // Update score
        const newScore = score + 1;
        setScore(newScore);
        
        // Call score update callback
        if (onScoreUpdate) onScoreUpdate(newScore);
        
        // Place new food
        placeFood(newSnake);
        
        // Increase speed
        const newSpeed = Math.max(MIN_SPEED, gameSpeed - SPEED_INCREMENT);
        setGameSpeed(newSpeed);
        
        if (gameLoopInterval) clearInterval(gameLoopInterval);
        const interval = setInterval(gameLoop, newSpeed);
        setGameLoopInterval(interval);
        
        // Return new snake with head added
        return newSnake;
      } else {
        // Snake moves (remove tail)
        return newSnake.slice(1);
      }
    });
  };
  
  // Place food at random position
  const placeFood = (currentSnake) => {
    // Find a position that doesn't overlap with the snake
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (
      // Check if the food overlaps with any snake segment
      currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)
    );
    
    setFood(newFood);
  };
  
  // End game
  const endGame = () => {
    if (gameLoopInterval) clearInterval(gameLoopInterval);
    if (onGameOver) onGameOver(score);
  };
  
  // Handle key press for game controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Prevent default behavior for arrow keys (scrolling)
      if ([37, 38, 39, 40, 87, 65, 83, 68, 80].includes(e.keyCode)) {
        e.preventDefault();
      }
      
      let newDirection = null;
      
      switch (e.keyCode) {
        // Arrow UP or W
        case 38:
        case 87:
          if (direction !== DIRECTIONS.DOWN) newDirection = DIRECTIONS.UP;
          break;
        // Arrow LEFT or A
        case 37:
        case 65:
          if (direction !== DIRECTIONS.RIGHT) newDirection = DIRECTIONS.LEFT;
          break;
        // Arrow DOWN or S
        case 40:
        case 83:
          if (direction !== DIRECTIONS.UP) newDirection = DIRECTIONS.DOWN;
          break;
        // Arrow RIGHT or D
        case 39:
        case 68:
          if (direction !== DIRECTIONS.LEFT) newDirection = DIRECTIONS.RIGHT;
          break;
        // P = Pause (only if game already started)
        case 80:
          if (!waitingForFirstMove) {
            setIsPaused(!isPaused);
          }
          break;
        default:
          break;
      }
      
      // If a valid direction was chosen
      if (newDirection) {
        setNextDirection(newDirection);
        
        // Start game if this is the first move
        if (waitingForFirstMove) {
          setDirection(newDirection);
          setWaitingForFirstMove(false);
          
          // Start game loop
          if (gameLoopInterval) clearInterval(gameLoopInterval);
          const interval = setInterval(gameLoop, INITIAL_SPEED);
          setGameLoopInterval(interval);
        }
      }
    };
    
    // Add event listener
    window.addEventListener('keydown', handleKeyPress);
    
    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [direction, isPaused, waitingForFirstMove, gameLoopInterval]);
  
  // Render game on canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = GRID_SIZE * CELL_SIZE;
    canvas.height = GRID_SIZE * CELL_SIZE;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid background (Nokia screen style)
    ctx.fillStyle = '#8bac0f'; // Nokia screen color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === snake.length - 1 ? '#0f380f' : '#306230'; // Head is darker
      ctx.fillRect(
        segment.x * CELL_SIZE, 
        segment.y * CELL_SIZE, 
        CELL_SIZE, 
        CELL_SIZE
      );
      
      // Add pixel grid effect to create retro look
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
    
    // Draw "start game" overlay if waiting for first move
    if (waitingForFirstMove) {
      ctx.fillStyle = 'rgba(15, 56, 15, 0.6)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#9bbc0f';
      ctx.font = '16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SNAKE READY!', canvas.width / 2, canvas.height / 2 - 30);
      ctx.fillText('Press an arrow key or WASD', canvas.width / 2, canvas.height / 2);
      ctx.fillText('to start the game', canvas.width / 2, canvas.height / 2 + 20);
      
      // Draw arrow hints
      const arrowSize = 15;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 + 60;
      
      // Up arrow
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - arrowSize * 2);
      ctx.lineTo(centerX - arrowSize, centerY - arrowSize);
      ctx.lineTo(centerX + arrowSize, centerY - arrowSize);
      ctx.fill();
      
      // Down arrow
      ctx.beginPath();
      ctx.moveTo(centerX, centerY + arrowSize * 2);
      ctx.lineTo(centerX - arrowSize, centerY + arrowSize);
      ctx.lineTo(centerX + arrowSize, centerY + arrowSize);
      ctx.fill();
      
      // Left arrow
      ctx.beginPath();
      ctx.moveTo(centerX - arrowSize * 2, centerY);
      ctx.lineTo(centerX - arrowSize, centerY - arrowSize);
      ctx.lineTo(centerX - arrowSize, centerY + arrowSize);
      ctx.fill();
      
      // Right arrow
      ctx.beginPath();
      ctx.moveTo(centerX + arrowSize * 2, centerY);
      ctx.lineTo(centerX + arrowSize, centerY - arrowSize);
      ctx.lineTo(centerX + arrowSize, centerY + arrowSize);
      ctx.fill();
    }
  }, [snake, food, isPaused, waitingForFirstMove]);
  
  return (
    <div className="snake-game">
      <canvas 
        ref={canvasRef} 
        className="game-canvas"
        style={{ 
          border: '2px solid #9bbc0f',
          maxWidth: '100%'
        }}
      />
      
      {/* Mobile controls */}
      <div className="mobile-controls">
        <div className="d-pad">
          <button 
            className="d-pad-btn up" 
            onClick={() => {
              if (direction !== DIRECTIONS.DOWN || !direction) {
                const newDir = DIRECTIONS.UP;
                setNextDirection(newDir);
                
                // Start game if this is the first move
                if (waitingForFirstMove) {
                  setDirection(newDir);
                  setWaitingForFirstMove(false);
                  
                  // Start game loop
                  if (gameLoopInterval) clearInterval(gameLoopInterval);
                  const interval = setInterval(gameLoop, INITIAL_SPEED);
                  setGameLoopInterval(interval);
                }
              }
            }}
          >
            ▲
          </button>
          <button 
            className="d-pad-btn left" 
            onClick={() => {
              if (direction !== DIRECTIONS.RIGHT || !direction) {
                const newDir = DIRECTIONS.LEFT;
                setNextDirection(newDir);
                
                // Start game if this is the first move
                if (waitingForFirstMove) {
                  setDirection(newDir);
                  setWaitingForFirstMove(false);
                  
                  // Start game loop
                  if (gameLoopInterval) clearInterval(gameLoopInterval);
                  const interval = setInterval(gameLoop, INITIAL_SPEED);
                  setGameLoopInterval(interval);
                }
              }
            }}
          >
            ◄
          </button>
          <button 
            className="d-pad-btn right" 
            onClick={() => {
              if (direction !== DIRECTIONS.LEFT || !direction) {
                const newDir = DIRECTIONS.RIGHT;
                setNextDirection(newDir);
                
                // Start game if this is the first move
                if (waitingForFirstMove) {
                  setDirection(newDir);
                  setWaitingForFirstMove(false);
                  
                  // Start game loop
                  if (gameLoopInterval) clearInterval(gameLoopInterval);
                  const interval = setInterval(gameLoop, INITIAL_SPEED);
                  setGameLoopInterval(interval);
                }
              }
            }}
          >
            ►
          </button>
          <button 
            className="d-pad-btn down" 
            onClick={() => {
              if (direction !== DIRECTIONS.UP || !direction) {
                const newDir = DIRECTIONS.DOWN;
                setNextDirection(newDir);
                
                // Start game if this is the first move
                if (waitingForFirstMove) {
                  setDirection(newDir);
                  setWaitingForFirstMove(false);
                  
                  // Start game loop
                  if (gameLoopInterval) clearInterval(gameLoopInterval);
                  const interval = setInterval(gameLoop, INITIAL_SPEED);
                  setGameLoopInterval(interval);
                }
              }
            }}
          >
            ▼
          </button>
        </div>
        
        <button 
          className="pause-btn"
          onClick={() => {
            if (!waitingForFirstMove) {
              setIsPaused(!isPaused);
            }
          }}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  );
};

export default SnakeGame;
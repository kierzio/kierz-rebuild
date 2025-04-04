import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    inVehicle: false,
    currentVehicle: null,
    playerPosition: [0, 1, 0],
    playerRotation: [0, 0, 0],
    vehicles: [
      { id: 1, type: 'sedan', position: [10, 0, 10], rotation: [0, Math.PI / 2, 0] },
      { id: 2, type: 'suv', position: [-10, 0, -5], rotation: [0, 0, 0] },
      { id: 3, type: 'sports', position: [5, 0, -15], rotation: [0, Math.PI / 4, 0] },
    ],
  });

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};
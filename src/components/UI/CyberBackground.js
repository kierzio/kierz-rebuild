import React from "react";

const CyberBackground = () => {
  // Create an array of random dots for the background
  const dots = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    animationDuration: `${Math.random() * 50 + 20}s`,
  }));

  return (
    <div className="absolute inset-0 bg-cyber-dark overflow-hidden -z-10">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/5 to-neon-purple/5"></div>
      
      {/* Random Dots */}
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-neon-blue animate-pulse"
          style={{
            top: dot.top,
            left: dot.left,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: Math.random() * 0.5 + 0.1,
            animationDuration: dot.animationDuration,
          }}
        ></div>
      ))}
      
      {/* Horizontal Lines */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-neon-blue/10 to-transparent"></div>
      
      {/* Vertical Lines */}
      <div className="absolute top-0 right-1/4 w-px h-full bg-neon-blue/10"></div>
      <div className="absolute top-0 left-1/3 w-px h-full bg-neon-purple/10"></div>
      
      {/* Radial Gradient */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-blue/5 filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-purple/5 filter blur-3xl"></div>
    </div>
  );
};

export default CyberBackground;
// src/components/UI/ParticleControls.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Interactive control panel for particle visualization
 * Allows users to switch between different interactive modes
 */
const ParticleControls = ({ 
  onModeChange, 
  currentMode = "repulse",
  position = "bottom-right", // 'top-left', 'top-right', 'bottom-left', 'bottom-right'
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Ensure we're running in browser environment
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Available interaction modes with icons and descriptions
  const modes = [
    { 
      id: "repulse", 
      name: "Repulse", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
      ),
      description: "Particles move away from cursor"
    },
    { 
      id: "attract", 
      name: "Attract", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
      ),
      description: "Particles move toward cursor"
    },
    { 
      id: "connect", 
      name: "Connect", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ),
      description: "Creates connections with nearby particles"
    },
    { 
      id: "bubble", 
      name: "Bubble", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
      description: "Creates bubble effect around cursor"
    },
    { 
      id: "trail", 
      name: "Trail", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
      ),
      description: "Particles follow cursor movement" 
    }
  ];
  
  // Get position-specific CSS classes
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
      default:
        return 'bottom-4 right-4';
    }
  };
  
  // Handle mode selection
  const handleModeSelect = (mode) => {
    onModeChange(mode);
    setIsOpen(false);
  };

  // Don't render anything during SSR
  if (!isClient) return null;
  
  return (
    <div className={`fixed z-40 ${getPositionClasses()} ${className}`}>
      {/* Controls container */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Toggle button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-cyber-dark/80 border border-neon-blue/50 text-neon-blue rounded-full p-3 shadow-lg backdrop-blur-md hover:border-neon-blue hover:text-white transition-all duration-300 focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
          </svg>
        </motion.button>
        
        {/* Mode selection panel */}
        {isOpen && (
          <motion.div
            className="absolute bottom-12 right-0 mb-2 w-48 bg-cyber-dark border border-neon-blue/50 rounded-lg shadow-lg backdrop-blur-md overflow-hidden"
            initial={{ opacity: 0, y: 10, scaleY: 0.8 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="py-1 px-2">
              <div className="text-xs text-gray-300 uppercase tracking-wider px-3 py-2 border-b border-neon-blue/20">
                Interaction Mode
              </div>
              
              {modes.map((mode) => (
                <motion.button
                  key={mode.id}
                  onClick={() => handleModeSelect(mode.id)}
                  className={`flex items-center space-x-2 w-full text-left px-3 py-2 text-sm rounded-md ${
                    currentMode === mode.id 
                      ? 'bg-neon-blue/20 text-neon-blue' 
                      : 'text-gray-300 hover:bg-cyber-light/30 hover:text-white'
                  } transition-colors duration-150`}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={`${currentMode === mode.id ? 'text-neon-blue' : 'text-gray-400'}`}>
                    {mode.icon}
                  </span>
                  <span>{mode.name}</span>
                </motion.button>
              ))}
              
              <div className="mt-1 pt-1 border-t border-neon-blue/20">
                <div className="text-xs text-gray-500 px-3 py-1">
                  {modes.find(m => m.id === currentMode)?.description}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

ParticleControls.propTypes = {
  onModeChange: PropTypes.func.isRequired,
  currentMode: PropTypes.oneOf(["repulse", "attract", "connect", "bubble", "trail"]),
  position: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
  className: PropTypes.string
};

export default ParticleControls;
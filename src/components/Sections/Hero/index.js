import React, { useState, useEffect } from "react";
import ParticleBackground from "../../UI/ParticleBackground";

const Hero = () => {
  const [useParticles, setUseParticles] = useState(true);
  const [userName, setUserName] = useState("");
  const [typing, setTyping] = useState(true);
  const [text, setText] = useState("");
  const [nameEntered, setNameEntered] = useState(false);
  const fullText = nameEntered ? (userName ? `Welcome to the future, ${userName}` : "Welcome to the Future") : "What's your name?";

  // Optimize the error handling useEffect in Hero component
  useEffect(() => {
    const errorHandler = (error) => {
      // Instead of console.error, consider a more robust error tracking solution
      setUseParticles(false);
    };

    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  // Typing effect
  useEffect(() => {
    // Load name from localStorage if available
    const storedName = typeof window !== "undefined" ? localStorage.getItem("userName") : null;
    if (storedName) {
      setUserName(storedName);
      setNameEntered(true);
    }

    if (typing) {
      const timeout = setTimeout(() => {
        setText(fullText.substring(0, text.length + 1));
        if (text.length === fullText.length) {
          setTyping(false);
        }
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [text, typing, fullText]);

  // Reset typing animation when fullText changes
  useEffect(() => {
    setText("");
    setTyping(true);
  }, [fullText]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const nameInput = e.target.elements.name.value.trim();
    if (nameInput) {
      setUserName(nameInput);
      setNameEntered(true);
      localStorage.setItem("userName", nameInput);
    }
  };

  return (
    <section id="intro" className="h-screen relative flex flex-col items-center justify-center overflow-hidden">
      {useParticles && <ParticleBackground />}
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Floating accent elements */}
      <div className="absolute w-32 h-32 -top-16 -left-16 bg-neon-purple/10 rounded-full blur-xl animate-floatUp"></div>
      <div className="absolute w-40 h-40 bottom-20 -right-20 bg-neon-blue/10 rounded-full blur-xl animate-floatUp" style={{animationDelay: '1s'}}></div>

      <div className="relative z-10 text-center px-4 animate-fadeIn">
        <h1 className="heading-cyber text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          {text}
          <span className="animate-blink inline-block w-[3px] h-[0.9em] bg-neon-purple ml-1 align-middle">|</span>
        </h1>

        {!nameEntered && (
          <form onSubmit={handleNameSubmit} className="mt-10 max-w-lg mx-auto">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input-cyber w-full md:w-auto"
                aria-label="Your name"
                autoFocus
              />
              <button
                type="submit"
                className="btn-primary w-full md:w-auto"
                aria-label="Enter"
              >
                Enter
              </button>
            </div>
          </form>
        )}
        
        {nameEntered && (
          <div className="mt-6">
            {/* Space reserved for future content if needed */}
          </div>
        )}

        <div className="mt-16">
          <button
            onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}
            className="group relative overflow-hidden px-10 py-3 bg-transparent border-0 outline-none focus:outline-none"
            aria-label="Scroll to about section"
          >
            {/* Main button background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark via-cyber-dark to-cyber-light/20 group-hover:from-cyber-light/10 transition-all duration-500"></div>
            
            {/* Animated border */}
            <div className="absolute inset-0 border border-neon-blue/50 group-hover:border-neon-blue group-hover:border-opacity-100 transition-all duration-300">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-blue transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-blue transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-blue transform -translate-x-1/2 translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-blue transform translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-neon-blue/20 blur-md transition-opacity duration-500"></div>
            
            {/* Horizontal light scan effect */}
            <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-0 -left-full w-[400%] h-full bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent group-hover:animate-scan"></div>
            </div>
            
            {/* Text and icon container */}
            <div className="relative flex items-center justify-center gap-3 z-10">
              <span className="font-orbitron text-white group-hover:text-neon-blue text-lg uppercase tracking-widest transition-colors duration-300">Explore</span>
              
              {/* Chevron down icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-blue transform group-hover:translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
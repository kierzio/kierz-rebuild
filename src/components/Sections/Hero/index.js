import React, { useState, useEffect } from "react";
import ParticleBackground from "../../UI/ParticleBackground";

const Hero = () => {
  const [useParticles, setUseParticles] = useState(true);
  const [userName, setUserName] = useState("");
  const [typing, setTyping] = useState(true);
  const [text, setText] = useState("");
  const fullText = userName ? `Welcome to the future, ${userName}` : "Welcome to the Future";

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
      localStorage.setItem("userName", nameInput);
    }
  };

  return (
    <section id="intro" className="h-screen relative flex flex-col items-center justify-center">
      {useParticles && <ParticleBackground />}

      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-neon-blue font-orbitron">
          {text}
          <span className="animate-pulse">|</span>
        </h1>

        {!userName && (
          <form onSubmit={handleNameSubmit} className="mt-8">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  name="name"
                  placeholder="What's your name?"
                  className="bg-white/10 text-neon-blue border-2 border-neon-blue/50 rounded-md px-4 py-3 focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/30 w-full md:w-64 font-orbitron text-sm tracking-wider placeholder-neon-blue/40 shadow-lg shadow-neon-blue/20"
                />
                <div className="absolute inset-0 bg-neon-blue/5 rounded-md pointer-events-none"></div>
              </div>
              <button
                type="submit"
                className="bg-neon-blue text-cyber-dark font-medium px-6 py-3 rounded-md hover:bg-neon-purple transition-all duration-300 w-full md:w-auto font-orbitron tracking-wider uppercase text-sm relative overflow-hidden group shadow-lg shadow-neon-blue/30"
              >
                <span className="relative z-10">Enter</span>
                <span className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          </form>
        )}

        <div className="mt-12">
          <button
            onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}
            className="group relative p-3 rounded-full hover:bg-neon-blue/10 transition-all duration-300 focus:outline-none"
            aria-label="Scroll to About section"
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-neon-blue/0 group-hover:bg-neon-blue/5 transition-all duration-500 animate-pulse"></div>
            
            {/* Inner circle */}
            <div className="relative border-2 border-neon-blue/50 rounded-full p-2 group-hover:border-neon-blue transition-all duration-300 shadow-lg group-hover:shadow-neon-blue/40">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-neon-blue animate-bounce group-hover:text-neon-purple transition-colors duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  className="group-hover:stroke-[2.5] transition-all duration-300"
                />
              </svg>
            </div>
            
            {/* Animated particles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-neon-blue animate-ping delay-100"></div>
              <div className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-neon-purple animate-ping delay-300"></div>
              <div className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-neon-blue animate-ping delay-500"></div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
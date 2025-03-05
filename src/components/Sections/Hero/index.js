import React, { useState, useEffect } from "react";
import ParticleBackground from "../../UI/ParticleBackground";
import CyberBackground from "../../UI/CyberBackground";

const Hero = () => {
  const [useParticles, setUseParticles] = useState(true);
  const [userName, setUserName] = useState("");
  const [typing, setTyping] = useState(true);
  const [text, setText] = useState("");
  const fullText = userName ? `Welcome back, ${userName}` : "Welcome to the Future";

// Add this console log at the top of the component
console.log("Hero component rendering, useParticles:", useParticles);

// Modify the error handling useEffect
useEffect(() => {
  const errorHandler = (error) => {
    console.error("Particle error detected:", error);
    setUseParticles(false);
  };

  window.addEventListener('error', errorHandler);

  return () => {
    window.removeEventListener('error', errorHandler);
  };
}, []);

// Also add this useEffect for debugging
useEffect(() => {
  console.log("useParticles state changed to:", useParticles);
}, [useParticles]);

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
      <ParticleBackground />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-neon-blue font-orbitron">
          {text}
          <span className="animate-pulse">|</span>
        </h1>

        {!userName && (
          <form onSubmit={handleNameSubmit} className="mt-8">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <input
                type="text"
                name="name"
                placeholder="What's your name?"
                className="bg-cyber-light text-white border border-neon-blue rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-purple w-full md:w-auto"
              />
              <button
                type="submit"
                className="bg-neon-blue text-cyber-dark font-medium px-6 py-2 rounded-md hover:bg-neon-purple transition-colors duration-300 w-full md:w-auto"
              >
                Enter
              </button>
            </div>
          </form>
        )}

        <div className="mt-12">
          <button
            onClick={() => document.getElementById("intro").scrollIntoView({ behavior: "smooth" })}
            className="group border border-neon-blue rounded-full p-2 hover:bg-neon-blue/20 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neon-blue animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
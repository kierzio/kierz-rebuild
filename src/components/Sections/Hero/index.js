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
          <p className="mt-6 text-lg text-gray-300 max-w-lg mx-auto leading-relaxed">
            Welcome to my digital playground. I'm a developer passionate about crafting immersive digital experiences with cutting-edge technology.
          </p>
        )}

        <div className="mt-16">
          <button
            onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}
            className="group inline-flex flex-col items-center gap-2 text-white hover:text-neon-blue transition-all duration-300"
            aria-label="Scroll to about section"
          >
            <span className="text-sm uppercase tracking-wider font-medium">Explore</span>
            <div className="border border-neon-blue/50 rounded-full p-2 group-hover:border-neon-blue group-hover:bg-neon-blue/10 group-hover:shadow-neon-blue transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neon-blue animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
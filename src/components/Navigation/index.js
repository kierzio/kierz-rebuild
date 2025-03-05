import React, { useState, useEffect } from "react";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-cyber-dark/80 backdrop-blur-md py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a 
          href="#intro" 
          className="text-neon-blue font-orbitron text-xl font-bold"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("intro");
          }}
        >
          Kierz.io
        </a>

        <div className="hidden md:flex space-x-6">
          {["intro"].map((section) => (
            <button
              key={section}
              onClick={() => scrollTo(section)}
              className="text-white hover:text-neon-blue transition-colors duration-300 uppercase tracking-wider font-orbitron text-sm"
            >
              {section === "intro" ? "Home" : section}
            </button>
          ))}
        </div>

        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
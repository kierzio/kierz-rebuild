import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = ["intro", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + 200; // Add offset for better detection
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
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
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-cyber-dark/70 backdrop-blur-md py-3 border-b border-neon-blue/20 shadow-md" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a 
          href="#intro" 
          className="text-neon-blue font-orbitron text-xl font-bold relative group"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("intro");
          }}
        >
          <span className="relative z-10 group-hover:text-shadow-neon-blue transition-all duration-300">kierz.io</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-blue group-hover:w-full transition-all duration-300"></span>
        </a>

        <div className="hidden md:flex space-x-8">
          {["intro", "about", "projects", "contact"].map((section) => {
            const isActive = activeSection === section;
            return (
              <motion.button
                key={section}
                onClick={() => scrollTo(section)}
                className={`relative text-sm uppercase tracking-wider font-orbitron py-1 transition-colors duration-300 ${
                  isActive ? 'text-neon-blue font-medium' : 'text-white hover:text-neon-blue/80'
                }`}
                aria-label={`Navigate to ${section === "intro" ? "home" : section} section`}
                whileHover={{ 
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 } 
                }}
              >
                <span>{section === "intro" ? "Home" : section}</span>
                <AnimatePresence>
                  {isActive && (
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-neon-blue"
                      initial={{ width: 0, left: "50%", opacity: 0 }}
                      animate={{ width: "100%", left: 0, opacity: 1 }}
                      exit={{ width: 0, left: "50%", opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        <button 
          className="md:hidden relative w-8 h-8 flex items-center justify-center focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <div className={`absolute w-6 h-0.5 bg-neon-blue transition-all duration-300 ${mobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></div>
          <div className={`absolute w-6 h-0.5 bg-neon-blue transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
          <div className={`absolute w-6 h-0.5 bg-neon-blue transition-all duration-300 ${mobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></div>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 top-16 bg-cyber-dark/95 backdrop-blur-md py-6 px-4 z-40"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div 
              className="flex flex-col space-y-6 items-center pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {["intro", "about", "projects", "contact"].map((section, index) => {
                const isActive = activeSection === section;
                return (
                  <motion.button
                    key={section}
                    onClick={() => {
                      scrollTo(section);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-center text-lg uppercase tracking-wider font-orbitron py-3 px-8 w-full max-w-xs transition-colors duration-300 border-b border-neon-blue/10 ${
                      isActive 
                        ? 'text-neon-blue bg-neon-blue/5 border-b-neon-blue/30' 
                        : 'text-white hover:text-neon-blue hover:bg-neon-blue/5'
                    }`}
                    aria-label={`Navigate to ${section === "intro" ? "home" : section} section`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                    whileHover={{ 
                      x: 5,
                      backgroundColor: isActive ? "rgba(0, 240, 255, 0.08)" : "rgba(0, 240, 255, 0.05)",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {section === "intro" ? "Home" : section}
                  </motion.button>
                );
              })}
              
              <motion.div 
                className="pt-6 flex space-x-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <motion.a 
                  href="https://github.com/kierzio" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-neon-blue transition-all duration-300"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </motion.a>
                <motion.a 
                  href="https://twitter.com/kierz_io" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-neon-purple transition-all duration-300"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.057 10.057 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </motion.a>
                <motion.a 
                  href="https://linkedin.com/in/kierzio" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-neon-pink transition-all duration-300"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
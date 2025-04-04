import React, { useState, useEffect } from "react";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('contact');
      if (section) {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
        setIsVisible(isInView);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="contact" className="min-h-screen py-20 bg-cyber-dark relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-72 h-72 rounded-full bg-neon-blue/5 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 w-80 h-80 rounded-full bg-neon-purple/5 blur-3xl"></div>
      
      {/* Animated lines */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute left-0 top-0 w-full h-0.5 bg-gradient-to-r from-neon-purple/0 via-neon-purple/30 to-neon-purple/0"></div>
        <div className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-neon-blue/0 via-neon-blue/30 to-neon-blue/0"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute top-1/5 left-1/5 w-1 h-1 rounded-full bg-neon-blue/70 animate-floatUp"></div>
      <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-neon-purple/70 animate-floatUp" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
      <div className="absolute bottom-1/5 right-1/5 w-1 h-1 rounded-full bg-neon-blue/70 animate-floatUp" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section Header with Animation */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 font-orbitron text-center relative">
              <span className="text-neon-blue relative">
                Contact
                <span className="absolute -bottom-3 left-0 w-full h-0.5 bg-neon-purple"></span>
              </span>
            </h2>
          </div>
          
          {/* Main Contact Content */}
          <div className={`relative z-10 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="border border-neon-blue/30 rounded-lg p-8 bg-cyber-dark-alt/50 backdrop-blur-sm relative overflow-hidden group">
              {/* Corner accent decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-blue/50 transform -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-purple/50 transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
              
              {/* Inner content */}
              <div className="text-center mb-8">
                <p className="text-white text-lg max-w-xl mx-auto">
                  Ready to collaborate or just want to say hello? Reach out through any of these channels.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {/* Email Card */}
                <a 
                  href="mailto:hello@kierz.io" 
                  className="relative group/item overflow-hidden border border-neon-blue/30 rounded-lg p-5 bg-cyber-dark/70 hover:border-neon-blue transition-all duration-300 flex flex-col items-center"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-neon-blue/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Moving highlight effect */}
                  <div className="absolute -inset-x-full top-0 h-full w-[200%] bg-gradient-to-r from-transparent via-neon-blue/10 to-transparent group-hover/item:translate-x-full transition-all duration-1000 ease-in-out opacity-0 group-hover/item:opacity-100"></div>
                  
                  {/* Icon */}
                  <div className="relative w-16 h-16 rounded-full border-2 border-neon-blue flex items-center justify-center text-neon-blue mb-4 overflow-hidden group-hover/item:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                      <path d="M2 7L10.1707 12.7293C11.3183 13.5955 12.6817 13.5955 13.8293 12.7293L22 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                      <path d="M6 11V14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                      <path d="M18 11V14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                    
                    {/* Icon background effect */}
                    <span className="absolute inset-0 bg-neon-blue opacity-0 group-hover/item:opacity-5 transition-opacity duration-300 rounded-full"></span>
                  </div>
                  
                  {/* Text content */}
                  <h4 className="font-orbitron text-neon-blue text-lg mb-1">Email</h4>
                  <p className="text-white">hello@kierz.io</p>
                </a>

                {/* Location Card */}
                <div className="relative group/item overflow-hidden border border-neon-purple/30 rounded-lg p-5 bg-cyber-dark/70 transition-all duration-300 flex flex-col items-center">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-neon-purple/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Moving highlight effect */}
                  <div className="absolute -inset-x-full top-0 h-full w-[200%] bg-gradient-to-r from-transparent via-neon-purple/10 to-transparent group-hover/item:translate-x-full transition-all duration-1000 ease-in-out opacity-0 group-hover/item:opacity-100"></div>
                  
                  {/* Icon */}
                  <div className="relative w-16 h-16 rounded-full border-2 border-neon-purple flex items-center justify-center text-neon-purple mb-4 overflow-hidden group-hover/item:shadow-[0_0_15px_rgba(191,0,255,0.5)] transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.6"/>
                      <path d="M12 2C7.58172 2 4 5.58172 4 10C4 11.8919 4.7112 13.6393 5.87265 15C7.11338 16.4578 12 22 12 22C12 22 16.8866 16.4578 18.1273 15C19.2888 13.6393 20 11.8919 20 10C20 5.58172 16.4183 2 12 2Z" stroke="currentColor" strokeWidth="1.6"/>
                      <path d="M14 9L10 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      <path d="M10 9L14 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    
                    {/* Icon background effect */}
                    <span className="absolute inset-0 bg-neon-purple opacity-0 group-hover/item:opacity-5 transition-opacity duration-300 rounded-full"></span>
                  </div>
                  
                  {/* Text content */}
                  <h4 className="font-orbitron text-neon-purple text-lg mb-1">Location</h4>
                  <p className="text-white">Manchester, UK</p>
                </div>
              </div>
              
              {/* Social Links Section */}
              <div className="mt-12 pt-8 border-t border-neon-blue/10 relative">
                {/* Section label */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-cyber-dark-alt px-8 py-1">
                  <h4 className="font-orbitron text-white text-sm tracking-wider">CONNECT ONLINE</h4>
                </div>
                
                <div className="flex justify-center gap-8 mt-4">
                  {/* GitHub */}
                  <a 
                    href="https://github.com/kierzio" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social"
                    aria-label="GitHub"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-neon-blue/60 flex items-center justify-center text-neon-blue hover:text-cyber-dark hover:bg-neon-blue transition-all duration-300 relative overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover/social:shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span className="absolute inset-0 bg-neon-blue transform scale-0 group-hover/social:scale-100 transition-transform duration-300 rounded-full"></span>
                    </div>
                  </a>
                  
                  {/* LinkedIn */}
                  <a 
                    href="https://www.linkedin.com/in/kieranhartley/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social"
                    aria-label="LinkedIn"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-neon-purple/60 flex items-center justify-center text-neon-purple hover:text-cyber-dark hover:bg-neon-purple transition-all duration-300 relative overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover/social:shadow-[0_0_15px_rgba(191,0,255,0.5)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <span className="absolute inset-0 bg-neon-purple transform scale-0 group-hover/social:scale-100 transition-transform duration-300 rounded-full"></span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-cyber-dark to-transparent z-10"></div>
    </section>
  );
};

export default Contact;
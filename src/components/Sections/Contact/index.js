import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen py-20 bg-cyber-dark bg-grid-pattern relative">
      <div className="container mx-auto px-4">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-neon-blue/20 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 border border-neon-purple/20 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-neon-blue/30 rounded-full blur-sm"></div>
        <div className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-neon-purple/20 rounded-full blur-sm"></div>
        
        <div className="max-w-xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-neon-blue font-orbitron text-center">
            <span className="relative inline-block">
              <span className="relative z-10">Contact</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-neon-purple transform translate-y-1"></span>
            </span>
          </h2>
          
          <div className="border border-neon-blue/30 rounded-lg p-8 bg-gradient-to-br from-cyber-dark/90 to-cyber-light/10 backdrop-blur-sm shadow-lg shadow-neon-blue/10 hover:shadow-neon-blue/20 transition-all duration-500">
            <h3 className="text-2xl font-orbitron text-white mb-8 text-center relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">Get In Touch</span>
            </h3>
            
            <p className="text-gray-300 mb-10 text-center">
              Have a project in mind or just want to say hello? I'm always open to discussing new ideas.
            </p>
            
            <div className="space-y-6 max-w-md mx-auto">
              <a href="mailto:hello@kierz.io" className="flex items-center gap-4 p-4 rounded-lg border border-neon-blue/20 bg-cyber-light/5 hover:bg-cyber-light/10 hover:border-neon-blue/50 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-blue/50 flex items-center justify-center text-cyber-dark shadow-md shadow-neon-blue/30 group-hover:shadow-neon-blue/50 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-neon-blue font-orbitron mb-1 group-hover:text-white transition-colors duration-300">Email</h4>
                  <p className="text-white group-hover:text-neon-blue transition-colors duration-300">hello@kierz.io</p>
                </div>
                <div className="text-neon-blue/50 group-hover:text-neon-blue transition-all duration-300 transform group-hover:translate-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </a>
              
              <div className="flex items-center gap-4 p-4 rounded-lg border border-neon-purple/20 bg-cyber-light/5 hover:bg-cyber-light/10 hover:border-neon-purple/50 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-purple to-neon-purple/50 flex items-center justify-center text-cyber-dark shadow-md shadow-neon-purple/30 group-hover:shadow-neon-purple/50 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-neon-purple font-orbitron mb-1 group-hover:text-white transition-colors duration-300">Location</h4>
                  <p className="text-white group-hover:text-neon-purple transition-colors duration-300">Manchester, UK</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 pt-8 border-t border-neon-blue/20">
              <h4 className="text-white font-orbitron mb-6 text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-white to-neon-purple">Connect</span>
              </h4>
              <div className="flex justify-center gap-6">
                <a 
                  href="https://github.com/kierzio" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="GitHub"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-neon-blue/50 flex items-center justify-center text-neon-blue hover:text-cyber-dark hover:bg-neon-blue transition-all duration-300 relative overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="absolute inset-0 bg-neon-blue transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
                  </div>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/kieranhartley/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="LinkedIn"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-neon-purple/50 flex items-center justify-center text-neon-purple hover:text-cyber-dark hover:bg-neon-purple transition-all duration-300 relative overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span className="absolute inset-0 bg-neon-purple transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 
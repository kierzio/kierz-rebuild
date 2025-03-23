import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen py-20 bg-cyber-dark bg-grid-pattern relative">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-neon-blue font-orbitron text-center">
            <span className="relative inline-block">
              <span className="relative z-10">Contact</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-neon-purple transform translate-y-1"></span>
            </span>
          </h2>
          
          <div className="border border-neon-blue/30 rounded-lg p-8 bg-cyber-light/20 backdrop-blur-sm">
            <h3 className="text-2xl font-orbitron text-white mb-6 text-center">Get In Touch</h3>
            
            <p className="text-gray-300 mb-8 text-center">
              Have a project in mind or just want to say hello? I'm always open to discussing new opportunities and ideas.
            </p>
            
            <div className="space-y-6 max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:hello@kierz.io" className="text-white hover:text-neon-blue transition-colors duration-300">
                  hello@kierz.io
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-white">Manchester, UK</span>
              </div>
            </div>
            
            <div className="mt-10 pt-8 border-t border-neon-blue/20">
              <h4 className="text-white font-orbitron mb-6 text-center">Connect</h4>
              <div className="flex flex-wrap justify-center gap-4">
                {["GitHub", "LinkedIn"].map((platform) => (
                  <a 
                    key={platform} 
                    href="#" 
                    className="px-4 py-2 border border-neon-blue/30 rounded-md text-sm text-white hover:border-neon-blue hover:text-neon-blue hover:bg-neon-blue/10 transition-all duration-300"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 
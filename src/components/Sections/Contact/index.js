import React, { useState } from "react";
import PropTypes from "prop-types";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    setStatus("success");
    
    // Reset form after successful submission (in real implementation)
    // setTimeout(() => {
    //   setFormState({ name: "", email: "", message: "" });
    //   setStatus(null);
    // }, 3000);
  };

  return (
    <section id="contact" className="min-h-screen py-20 bg-cyber-dark bg-grid-pattern relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-neon-blue font-orbitron text-center">
            <span className="relative inline-block">
              <span className="relative z-10">Contact</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-neon-purple transform translate-y-1"></span>
            </span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <div className="border border-neon-blue/30 rounded-lg p-6 bg-cyber-light/20 backdrop-blur-sm">
                <h3 className="text-2xl font-orbitron text-white mb-6">Get In Touch</h3>
                
                <p className="text-gray-300 mb-6">
                  Have a project in mind or just want to say hello? I'm always open to discussing new opportunities and ideas.
                </p>
                
                <div className="space-y-4">
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-white">Based in London, UK</span>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-neon-blue/20">
                  <h4 className="text-white font-orbitron mb-4">Connect</h4>
                  <div className="flex gap-4">
                    {["GitHub", "Twitter", "LinkedIn", "CodePen"].map((platform) => (
                      <a 
                        key={platform} 
                        href="#" 
                        className="px-3 py-2 border border-neon-blue/30 rounded-md text-sm text-white hover:border-neon-blue hover:text-neon-blue transition-all duration-300"
                      >
                        {platform}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="border border-neon-purple/30 rounded-lg p-6 bg-cyber-light/20 backdrop-blur-sm">
                <h3 className="text-2xl font-orbitron text-white mb-6">Send Message</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2 text-sm">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-md border border-neon-blue/30 bg-cyber-dark/70 text-white focus:outline-none focus:border-neon-blue transition-colors duration-300"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white mb-2 text-sm">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-md border border-neon-blue/30 bg-cyber-dark/70 text-white focus:outline-none focus:border-neon-blue transition-colors duration-300"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-white mb-2 text-sm">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 rounded-md border border-neon-blue/30 bg-cyber-dark/70 text-white focus:outline-none focus:border-neon-blue transition-colors duration-300 resize-none"
                    ></textarea>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-neon-purple text-white font-medium py-3 rounded-md hover:bg-neon-blue transition-colors duration-300 uppercase tracking-wider font-orbitron text-sm"
                  >
                    Send Message
                  </button>
                </div>
                
                {status === "success" && (
                  <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-md text-green-400 text-sm animate-fadeIn">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                
                {status === "error" && (
                  <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-red-400 text-sm animate-fadeIn">
                    Something went wrong. Please try again later.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Contact.propTypes = {};

export default Contact; 
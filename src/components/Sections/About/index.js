import React from "react";
import PropTypes from "prop-types";

const About = () => {
  return (
    <section id="about" className="min-h-screen py-20 bg-cyber-dark bg-grid-pattern relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-neon-blue font-orbitron">
            <span className="relative inline-block">
              <span className="relative z-10">About Me</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-neon-purple transform translate-y-1"></span>
            </span>
          </h2>
          
          <div className="space-y-8 animate-fadeIn">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a <span className="text-neon-blue font-medium">full-stack developer</span> and <span className="text-neon-purple font-medium">digital artist</span> with a passion for creating immersive cyberpunk-inspired web experiences. My work exists at the intersection of cutting-edge technology and futuristic design.
            </p>
            
            <div className="border border-neon-blue/30 rounded-lg p-6 bg-cyber-light/30 backdrop-blur-sm">
              <h3 className="text-2xl font-orbitron text-white mb-4">Technical Arsenal</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["React", "Node.js", "Python", "Linux", "AI", "Rest API", "Power BI", "Excel"].map((skill) => (
                  <div key={skill} className="border border-neon-blue/20 rounded px-4 py-2 text-center bg-cyber-dark hover:border-neon-blue hover:text-neon-blue transition-colors duration-300">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 border border-neon-purple/30 rounded-lg p-6 bg-cyber-light/30 backdrop-blur-sm">
                <h3 className="text-xl font-orbitron text-white mb-3">Background</h3>
                <p className="text-gray-300">
                  With over 5 years of experience building digital products, I specialize in creating interfaces that are not only functional but immersive. I believe the future of the web is experiential.
                </p>
              </div>
              
              <div className="flex-1 border border-neon-blue/30 rounded-lg p-6 bg-cyber-light/30 backdrop-blur-sm">
                <h3 className="text-xl font-orbitron text-white mb-3">Philosophy</h3>
                <p className="text-gray-300">
                    I create interfaces and data solutions that deliver powerful functionality through clarity and precision. My focus is intuitive, responsive design combined with performant, modern technologies tailored to deliver real-world impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-cyber-dark to-transparent z-10"></div>
    </section>
  );
};

About.propTypes = {};

export default About; 
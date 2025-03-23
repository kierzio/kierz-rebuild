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
            I'm Kieran, an <span className="text-[var(--color-neon-blue)] font-medium">Information Systems Manager</span> who loves solving complex puzzles through code. By day, I transform technical challenges into elegant solutions that drive business growth. By night, I tinker with <span className="text-[var(--color-neon-purple)] font-medium">full-stack projects</span> like this website, constantly expanding my toolkit. When I'm not coding, you'll find me running marathons, playing chess, or diving into my collection of 90s tech memorabilia.
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
                With over 5 years of experience in digital transformation, I bring a unique blend of economic analysis and technical expertise to every project. My foundation in Economics provides analytical rigor, while my Computer Science background and continuous learning fuel my technical capabilities. I've specialized in developing data-driven systems that bridge business needs with technological solutions. My approach combines formal education with hands-on experience, allowing me to see both the technical details and the bigger strategic picture in every challenge I tackle.
                </p>
              </div>
              
              <div className="flex-1 border border-neon-blue/30 rounded-lg p-6 bg-cyber-light/30 backdrop-blur-sm">
                <h3 className="text-xl font-orbitron text-white mb-3">Philosophy</h3>
                <p className="text-gray-300">
                I create digital experiences that honor the personal, exploratory spirit of the early web while embracing tomorrow's innovations. I believe AI represents an extraordinary opportunity to enhance human creativity—not replace it. My work aims to find that sweet spot where cutting-edge technology amplifies our uniquely human capacity for imagination, connection, and meaning. In a world of increasing automation, I'm committed to building tools that expand possibilities rather than limit them.
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
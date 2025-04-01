import React, { useState } from "react";
import PropTypes from "prop-types";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const projects = [
    {
      id: 1,
      title: "NeoCity Dashboard",
      description: "A futuristic dashboard for monitoring smart city infrastructure with real-time data visualization.",
      category: "frontend",
      tags: ["React", "D3.js", "WebSockets"]
    },
    {
      id: 2,
      title: "Synthwave Audio Processor",
      description: "Browser-based audio processing tool with retro-futuristic visualizations and effects.",
      category: "audio",
      tags: ["Web Audio API", "Canvas", "JavaScript"]
    },
    {
      id: 3,
      title: "Quantum Database",
      description: "Experimental database system with encrypted storage and advanced query capabilities.",
      category: "backend",
      tags: ["Node.js", "GraphQL", "Encryption"]
    },
    {
      id: 4,
      title: "CyberDeck UI Kit",
      description: "A comprehensive UI component library for building cyberpunk-themed interfaces.",
      category: "frontend",
      tags: ["React", "Storybook", "TailwindCSS"]
    }
  ];
  
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="min-h-screen py-20 bg-cyber-dark relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 text-neon-blue font-orbitron text-center">
            <span className="relative inline-block">
              <span className="relative z-10">Projects</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-neon-purple transform translate-y-1"></span>
            </span>
          </h2>
          <div className="mt-4 inline-block px-4 py-1 bg-neon-purple/10 border border-neon-purple rounded-full">
            <span className="text-neon-purple text-sm font-medium tracking-wider">COMING SOON</span>
          </div>
        </div>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["all", "frontend", "backend", "audio"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-neon-blue text-cyber-dark shadow-neon-blue"
                  : "bg-cyber-light text-white border border-neon-blue/30 hover:border-neon-blue"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="border border-neon-blue/20 rounded-lg p-6 bg-cyber-light/20 backdrop-blur-sm hover:border-neon-blue/70 transition-all duration-300 group animate-fadeIn"
            >
              <h3 className="text-2xl font-orbitron text-white mb-3 group-hover:text-neon-blue transition-colors duration-300">
                {project.title}
              </h3>
              
              <p className="text-gray-300 mb-4">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="inline-block px-3 py-1 text-xs rounded-full bg-cyber-dark border border-neon-purple/30 text-neon-purple"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="mt-auto flex justify-between items-center">
                <div className="text-neon-blue/50 text-sm flex items-center gap-1">
                  <span>Coming soon</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <div className="text-neon-blue/50 text-sm flex items-center gap-1">
                  <span>In development</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-cyber-dark to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-cyber-dark to-transparent z-10"></div>
    </section>
  );
};

Projects.propTypes = {};

export default Projects; 
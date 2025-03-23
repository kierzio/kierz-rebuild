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
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-neon-blue font-orbitron text-center">
          <span className="relative inline-block">
            <span className="relative z-10">Projects [coming soon]</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-neon-purple transform translate-y-1"></span>
          </span>
        </h2>
        
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
                <button className="text-neon-blue text-sm flex items-center gap-1 hover:text-neon-purple transition-colors duration-300">
                  <span>View details</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                
                <button className="text-neon-blue text-sm flex items-center gap-1 hover:text-neon-purple transition-colors duration-300">
                  <span>Live demo</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
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
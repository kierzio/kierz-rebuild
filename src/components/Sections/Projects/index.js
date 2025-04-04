import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "gatsby";

/**
 * Projects section with animated filtering
 * Implements cyberpunk-themed project cards with category filtering
 */
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const projectsRef = useRef(null);
  
  // Project data
  const projects = [
    {
      id: 1,
      title: "Night City GTA",
      description: "A cyberpunk GTA-style game built with Three.js featuring an open world environment with neon-lit streets and interactive gameplay.",
      category: "frontend",
      featured: true,
      image: "gta-game.jpg", // Optional future image
      tags: ["Three.js", "WebGL", "JavaScript"],
      link: "/game" // Game link
    },
    {
      id: 2,
      title: "Synthwave Audio Processor",
      description: "Browser-based audio processing tool with retro-futuristic visualizations and effects.",
      category: "audio",
      featured: false,
      image: "synthwave.jpg", // Optional future image
      tags: ["Web Audio API", "Canvas", "JavaScript"],
      link: "#" // Placeholder link
    },
    {
      id: 3,
      title: "Quantum Database",
      description: "Experimental database system with encrypted storage and advanced query capabilities.",
      category: "backend",
      featured: true,
      image: "quantum.jpg", // Optional future image
      tags: ["Node.js", "GraphQL", "Encryption"],
      link: "#" // Placeholder link
    },
    {
      id: 4,
      title: "CyberDeck UI Kit",
      description: "A comprehensive UI component library for building cyberpunk-themed interfaces.",
      category: "frontend",
      featured: false,
      image: "cyberdeck.jpg", // Optional future image
      tags: ["React", "Storybook", "TailwindCSS"],
      link: "#" // Placeholder link
    },
    {
      id: 5,
      title: "Neural Audio Generator",
      description: "AI-powered tool that generates unique soundscapes and music using neural networks.",
      category: "audio",
      featured: true,
      image: "neural-audio.jpg", // Optional future image
      tags: ["TensorFlow.js", "Web Audio API", "Python"],
      link: "#" // Placeholder link
    },
    {
      id: 6,
      title: "Secure Mesh Network",
      description: "Decentralized messaging system with end-to-end encryption and mesh topology.",
      category: "backend",
      featured: false,
      image: "mesh-network.jpg", // Optional future image
      tags: ["WebRTC", "Cryptography", "P2P"],
      link: "#" // Placeholder link
    }
  ];
  
  // Filter categories
  const categories = [
    { id: "all", label: "All Projects" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "audio", label: "Audio" }
  ];

  // Filter projects when active filter changes
  useEffect(() => {
    // Apply filter
    const filtered = activeFilter === "all" 
      ? projects 
      : projects.filter(project => project.category === activeFilter);
    
    // Set filteredProjects with a slight delay for animation
    setTimeout(() => {
      setFilteredProjects(filtered);
      setInitialLoad(false);
    }, initialLoad ? 0 : 300);

    // Client-side only: add filter class for CSS animations
    if (typeof window !== 'undefined' && !initialLoad) {
      const projectElements = document.querySelectorAll('.project-card');
      
      projectElements.forEach(card => {
        const cardId = card.getAttribute('data-id');
        const project = projects.find(p => p.id.toString() === cardId);
        
        if (!project) return;
        
        const isVisible = activeFilter === "all" || project.category === activeFilter;
        
        // Apply CSS transitions
        if (isVisible) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    }
  }, [activeFilter, initialLoad]);

  // Initial load of all projects
  useEffect(() => {
    setFilteredProjects(projects);
  }, []);

  // Scroll to the correct position when filter changes
  useEffect(() => {
    if (!initialLoad && projectsRef.current) {
      const rect = projectsRef.current.getBoundingClientRect();
      if (rect.top < 0) {
        projectsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [filteredProjects, initialLoad]);

  // Handle setting active filter
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  // Framer Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      y: 20, 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section 
      id="projects" 
      className="min-h-screen py-20 bg-cyber-dark relative page-transition"
      ref={projectsRef}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 text-neon-blue font-orbitron text-center">
            <span className="relative inline-block">
              <span className="relative z-10">Projects</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-neon-purple transform translate-y-1"></span>
            </span>
          </h2>
        </div>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleFilterClick(category.id)}
              className={`filter-btn px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                activeFilter === category.id
                  ? "bg-neon-blue text-cyber-dark shadow-md shadow-neon-blue/30 active"
                  : "bg-cyber-light text-white border border-neon-blue/30 hover:border-neon-blue"
              }`}
              data-filter={category.id}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Project grid with motion */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className={`project-card border border-neon-blue/20 rounded-lg p-6 bg-cyber-light/20 backdrop-blur-sm hover:border-neon-blue/70 transition-all duration-300 group ${project.category}`}
                data-id={project.id}
                style={{
                  transition: 'opacity 0.3s ease, transform 0.4s ease, border-color 0.3s ease'
                }}
              >
                {project.featured && (
                  <div className="absolute -top-3 -right-3 bg-neon-purple text-xs px-3 py-1 rounded-full text-white shadow-md shadow-neon-purple/30 border border-neon-purple/50">
                    Featured
                  </div>
                )}
                
                <h3 className="text-xl md:text-2xl font-orbitron text-white mb-3 group-hover:text-neon-blue transition-colors duration-300">
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
                  {project.id === 1 ? (
                    <div className="text-neon-purple/80 text-sm flex items-center gap-1">
                      <span>Play now</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="text-neon-blue/50 text-sm flex items-center gap-1">
                      <span>Coming soon</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                  
                  {project.id === 1 ? (
                    <Link
                      to="/game"
                      className="cyber-btn relative overflow-hidden py-2 px-4 text-sm text-neon-purple border border-neon-purple/50 hover:bg-neon-purple/10 transition-all duration-300 rounded-sm group"
                    >
                      <span className="relative z-10">Play Game</span>
                      
                      {/* Hover effects */}
                      <span className="absolute inset-0 h-full w-0 bg-neon-purple/10 transition-all duration-300 group-hover:w-full"></span>
                      <span className="absolute top-0 right-0 h-1 w-2 bg-neon-purple"></span>
                      <span className="absolute bottom-0 left-0 h-1 w-2 bg-neon-purple"></span>
                    </Link>
                  ) : (
                    <button className="cyber-btn relative overflow-hidden py-2 px-4 text-sm text-neon-blue border border-neon-blue/50 hover:bg-neon-blue/10 transition-all duration-300 rounded-sm group">
                      <span className="relative z-10">More details</span>
                      
                      {/* Hover effects */}
                      <span className="absolute inset-0 h-full w-0 bg-neon-blue/10 transition-all duration-300 group-hover:w-full"></span>
                      <span className="absolute top-0 right-0 h-1 w-2 bg-neon-blue"></span>
                      <span className="absolute bottom-0 left-0 h-1 w-2 bg-neon-blue"></span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Empty state for no matches */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl text-neon-blue mb-4 font-orbitron">No projects match this filter</h3>
            <p className="text-gray-400">Try selecting a different category</p>
          </div>
        )}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-cyber-dark to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-cyber-dark to-transparent z-10"></div>
      
      {/* Add decorative grid lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      {/* Add script for animation effects */}
      {typeof window !== 'undefined' && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Setup project filters with animations
              function setupProjectFilters() {
                const filterButtons = document.querySelectorAll('.filter-btn');
                const projectCards = document.querySelectorAll('.project-card');
                
                // Apply initial state - show all projects
                projectCards.forEach(card => {
                  card.style.display = 'block';
                  card.style.opacity = '1';
                  card.style.transform = 'translateY(0)';
                });
                
                // Add click event to filter buttons
                filterButtons.forEach(button => {
                  button.addEventListener('click', () => {
                    // Update active button state
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    const filterValue = button.getAttribute('data-filter');
                    
                    // Filter projects with animation
                    projectCards.forEach(card => {
                      // Check if card matches filter or if showing all
                      const isVisible = filterValue === 'all' || card.classList.contains(filterValue);
                      
                      if (isVisible) {
                        // Show with animation
                        card.style.display = 'block';
                        setTimeout(() => {
                          card.style.opacity = '1';
                          card.style.transform = 'translateY(0)';
                        }, 10);
                      } else {
                        // Hide with animation
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                          card.style.display = 'none';
                        }, 300);
                      }
                    });
                  });
                });
              }
              
              // Run setup when content is loaded
              document.addEventListener('DOMContentLoaded', setupProjectFilters);
            `
          }}
        />
      )}
    </section>
  );
};

export default Projects;
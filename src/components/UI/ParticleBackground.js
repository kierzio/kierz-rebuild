// src/components/UI/ParticleBackground.js
import React, { useCallback, useState, useRef, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import PropTypes from "prop-types";

/**
 * Enhanced ParticleBackground with advanced interaction effects
 * - Mouse repulsion/attraction
 * - Dynamic connections
 * - Interactive nodes
 * - Enhanced glow on hover
 */
const ParticleBackground = ({ 
  className,
  interactivityMode = "repulse", // "repulse", "attract", "connect", "bubble", "trail"
  density = 60,
  particleColor = ["#ff00c3", "#00f0ff", "#bf00ff", "#8A2BE2", "#ff69b4"],
  linkColor = ["#ff00c3", "#00f0ff", "#bf00ff"],
  speedFactor = 1,
  responsive = true
}) => {
  const [hasError, setHasError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);
  const particlesRef = useRef(null);
  
  // Initialize particles engine
  const particlesInit = useCallback(async (engine) => {
    try {
      await loadFull(engine);
    } catch (error) {
      console.error("Failed to initialize tsParticles:", error);
      setHasError(true);
    }
  }, []);

  // Handle particles loading
  const particlesLoaded = useCallback(async (container) => {
    particlesRef.current = container;
  }, []);

  // Handle hover over particles
  useEffect(() => {
    const handleHover = (event) => {
      if (containerRef.current && containerRef.current.contains(event.target)) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    document.addEventListener('mousemove', handleHover);
    return () => document.removeEventListener('mousemove', handleHover);
  }, []);

  // Skip rendering if there was an error
  if (hasError) return null;

  // Calculate actual particle density based on screen size for responsive behavior
  const getParticleDensity = () => {
    if (!responsive) return density;
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    
    if (width < 768) return Math.floor(density * 0.5); // Mobile
    if (width < 1200) return Math.floor(density * 0.75); // Tablet
    return density; // Desktop
  };

  // Get particle movement speed based on device and hover state
  const getParticleSpeed = () => {
    const baseSpeed = speedFactor * 1.2;
    
    // Increase speed slightly when hovered for more dynamic feel
    return hovered ? baseSpeed * 1.25 : baseSpeed;
  };

  // Configure mouse interaction effect based on selected mode
  const getInteractionMode = () => {
    switch (interactivityMode) {
      case "attract":
        return {
          onHover: {
            enable: true,
            mode: "attract"
          },
          onClick: {
            enable: true,
            mode: "push"
          },
          modes: {
            attract: {
              distance: 200,
              duration: 0.4,
              factor: 5,
              speed: 1
            },
            push: {
              quantity: 4
            }
          }
        };
        
      case "connect":
        return {
          onHover: {
            enable: true,
            mode: "connect"
          },
          onClick: {
            enable: true,
            mode: "push"
          },
          modes: {
            connect: {
              distance: 150,
              radius: 100,
              links: {
                opacity: 0.5
              }
            },
            push: {
              quantity: 4
            }
          }
        };
        
      case "bubble":
        return {
          onHover: {
            enable: true,
            mode: "bubble"
          },
          onClick: {
            enable: true,
            mode: "repulse"
          },
          modes: {
            bubble: {
              distance: 200,
              size: 6,
              duration: 2,
              opacity: 0.8,
              color: {
                value: linkColor
              }
            },
            repulse: {
              distance: 200,
              duration: 0.4
            }
          }
        };
        
      case "trail":
        return {
          onHover: {
            enable: true,
            mode: "trail"
          },
          onClick: {
            enable: true,
            mode: "push"
          },
          modes: {
            trail: {
              delay: 0.05,
              quantity: 5,
              pauseOnStop: true
            },
            push: {
              quantity: 4
            }
          }
        };
      
      // Default is repulse  
      default:
        return {
          onHover: {
            enable: true,
            mode: "repulse"
          },
          onClick: {
            enable: true,
            mode: "push"
          },
          modes: {
            repulse: {
              distance: 150,
              duration: 0.4
            },
            push: {
              quantity: 4
            }
          }
        };
    }
  };

  return (
    <div ref={containerRef} className={`absolute inset-0 z-0 ${className || ""}`}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: false,
          fpsLimit: 60,
          background: {
            color: {
              value: "#0a0028",
            },
          },
          particles: {
            color: {
              value: particleColor,
            },
            links: {
              color: {
                value: linkColor,
              },
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 1,
              shadow: {
                enable: true, 
                color: {
                  value: "#00f0ff"
                },
                blur: 5
              },
              triangles: {
                enable: false,
                opacity: 0.1
              }
            },
            move: {
              enable: true,
              speed: getParticleSpeed(),
              direction: "none",
              random: true,
              straight: false,
              outMode: "out",
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
              },
              trail: {
                enable: true,
                length: 3,
                fillColor: {
                  value: "#000000"
                }
              }
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: getParticleDensity(),
            },
            opacity: {
              value: 0.7,
              random: true,
              animation: {
                enable: true,
                speed: 0.8,
                minimumValue: 0.3,
                sync: false
              }
            },
            size: {
              value: { min: 1, max: 3 },
              random: true,
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.3,
                sync: false
              }
            },
            shape: {
              type: "circle"
            },
            twinkle: {
              particles: {
                enable: true,
                color: "#ffffff",
                frequency: 0.05,
                opacity: 1
              },
              lines: {
                enable: true,
                frequency: 0.01,
                color: "#00f0ff",
                opacity: 0.5
              }
            },
            // Add glow effect to particles
            shadow: {
              enable: true,
              color: {
                value: "#00f0ff"
              },
              blur: 3,
              opacity: 0.3
            }
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              ...getInteractionMode().onHover,
              ...getInteractionMode().onClick,
              resize: true
            },
            modes: {
              ...getInteractionMode().modes
            }
          },
          detectRetina: true,
          // Add custom motion effects
          motion: {
            reduce: {
              factor: 0.5,
              value: true
            }
          }
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'auto' // Enable pointer events for interaction
        }}
      />
    </div>
  );
};

ParticleBackground.propTypes = {
  className: PropTypes.string,
  interactivityMode: PropTypes.oneOf(["repulse", "attract", "connect", "bubble", "trail"]),
  density: PropTypes.number,
  particleColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  linkColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  speedFactor: PropTypes.number,
  responsive: PropTypes.bool
};

export default ParticleBackground;
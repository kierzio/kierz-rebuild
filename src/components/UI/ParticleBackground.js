// src/components/UI/ParticleBackground.js
import React, { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import PropTypes from "prop-types";

const ParticleBackground = ({ className }) => {
  const [hasError, setHasError] = useState(false);
  
  const particlesInit = useCallback(async (engine) => {
    try {
      await loadFull(engine);
    } catch (error) {
      console.error("Failed to initialize tsParticles:", error);
      setHasError(true);
    }
  }, []);

  const particlesLoaded = useCallback(async () => {
    // Optional: Add any post-loading actions here
  }, []);

  // Skip rendering if there was an error
  if (hasError) return null;

  return (
    <div className={`absolute inset-0 z-0 ${className || ""}`}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: false,
          background: {
            color: {
              value: "#0a0028",
            },
          },
          particles: {
            color: {
              value: ["#ff00c3", "#00f0ff", "#bf00ff", "#8A2BE2", "#ff69b4"],
            },
            links: {
              color: {
                value: ["#ff00c3", "#00f0ff", "#bf00ff"],
              },
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1.2,
              direction: "none",
              random: true,
              straight: false,
              outMode: "out",
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
              }
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 60,
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
              random: true
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
              }
            }
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onHover: {
                enable: true,
                mode: "bubble"
              },
              onClick: {
                enable: true,
                mode: "push"
              }
            },
            modes: {
              bubble: {
                distance: 200,
                size: 6,
                duration: 2,
                opacity: 0.8,
                color: {
                  value: ["#ff00c3", "#00f0ff", "#bf00ff"]
                }
              },
              push: {
                quantity: 4
              }
            }
          },
          detectRetina: true
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

ParticleBackground.propTypes = {
  className: PropTypes.string
};

export default ParticleBackground;
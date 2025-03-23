// src/components/UI/ParticleBackground.js
import React, { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticleBackground = () => {
  const [hasError, setHasError] = useState(false);
  
  const particlesInit = useCallback(async (engine) => {
    try {
      await loadFull(engine);
    } catch (error) {
      console.error("Failed to initialize tsParticles:", error);
      setHasError(true);
    }
  }, []);

  const particlesLoaded = useCallback(async (container) => {
  }, []);

  // Skip rendering if there was an error
  if (hasError) return null;

  return (
    <div className="absolute inset-0 z-0">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: false,
          background: {
            color: {
              value: "#0d0d0d",
            },
          },
          particles: {
            color: {
              value: ["#00f0ff", "#bf00ff", "#3f36d5"],
            },
            links: {
              color: "#00f0ff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1.2,
              direction: "none",
              random: false,
              straight: false,
              outMode: "bounce",
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
            },
            size: {
              value: 3,
              random: true
            },
            shape: {
              type: "circle"
            }
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "grab"
              },
              onclick: {
                enable: true,
                mode: "push"
              }
            },
            modes: {
              grab: {
                distance: 140,
                links: {
                  opacity: 0.8
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

export default ParticleBackground;
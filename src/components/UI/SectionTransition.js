// src/components/UI/SectionTransition.js
import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// Effect types that can be applied to sections
const EFFECTS = {
  FADE_UP: "fadeUp",
  FADE_DOWN: "fadeDown",
  FADE_LEFT: "fadeLeft",
  FADE_RIGHT: "fadeRight",
  ZOOM_IN: "zoomIn",
  GLOW: "glow"
};

/**
 * SectionTransition component for animated section entries
 * Provides multiple animation styles suited to the cyberpunk theme
 */
const SectionTransition = ({
  children,
  className = "",
  effect = EFFECTS.FADE_UP,
  delay = 0,
  duration = 0.6,
  threshold = 0.15,
  once = true,
  staggerChildren = 0.1,
  stagger = false
}) => {
  // Define different animation variants based on effect type
  const getVariants = () => {
    switch (effect) {
      case EFFECTS.FADE_UP:
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration,
              ease: [0.25, 0.1, 0.25, 1.0],
              staggerChildren: stagger ? staggerChildren : 0,
              delayChildren: stagger ? delay : 0,
              delay: !stagger ? delay : 0
            }
          }
        };
      case EFFECTS.FADE_DOWN:
        return {
          hidden: { opacity: 0, y: -50 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration,
              ease: [0.25, 0.1, 0.25, 1.0],
              staggerChildren: stagger ? staggerChildren : 0,
              delayChildren: stagger ? delay : 0,
              delay: !stagger ? delay : 0
            }
          }
        };
      case EFFECTS.FADE_LEFT:
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: {
              duration,
              ease: [0.25, 0.1, 0.25, 1.0],
              staggerChildren: stagger ? staggerChildren : 0,
              delayChildren: stagger ? delay : 0,
              delay: !stagger ? delay : 0
            }
          }
        };
      case EFFECTS.FADE_RIGHT:
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: {
              duration,
              ease: [0.25, 0.1, 0.25, 1.0],
              staggerChildren: stagger ? staggerChildren : 0,
              delayChildren: stagger ? delay : 0,
              delay: !stagger ? delay : 0
            }
          }
        };
      case EFFECTS.ZOOM_IN:
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
              duration,
              ease: [0.25, 0.1, 0.25, 1.0],
              staggerChildren: stagger ? staggerChildren : 0,
              delayChildren: stagger ? delay : 0,
              delay: !stagger ? delay : 0
            }
          }
        };
      case EFFECTS.GLOW:
        return {
          hidden: { 
            opacity: 0, 
            scale: 0.95,
            textShadow: "0 0 0px rgba(0, 240, 255, 0)",
            boxShadow: "0 0 0px rgba(0, 240, 255, 0)"
          },
          visible: { 
            opacity: 1, 
            scale: 1,
            textShadow: "0 0 8px rgba(0, 240, 255, 0.5)",
            boxShadow: "0 0 15px rgba(0, 240, 255, 0.3)",
            transition: {
              duration,
              ease: [0.25, 0.1, 0.25, 1.0],
              staggerChildren: stagger ? staggerChildren : 0,
              delayChildren: stagger ? delay : 0,
              delay: !stagger ? delay : 0
            }
          }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: {
              duration,
              staggerChildren: stagger ? staggerChildren : 0,
              delayChildren: stagger ? delay : 0,
              delay: !stagger ? delay : 0
            }
          }
        };
    }
  };

  // Child item variants for staggered animations
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, threshold }}
      variants={getVariants()}
      className={className}
    >
      {stagger 
        ? React.Children.map(children, child => (
            <motion.div variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
};

SectionTransition.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  effect: PropTypes.oneOf(Object.values(EFFECTS)),
  delay: PropTypes.number,
  duration: PropTypes.number,
  threshold: PropTypes.number,
  once: PropTypes.bool,
  staggerChildren: PropTypes.number,
  stagger: PropTypes.bool
};

export { EFFECTS };
export default SectionTransition;
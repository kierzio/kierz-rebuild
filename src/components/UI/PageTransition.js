// src/components/UI/PageTransition.js
import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

/**
 * PageTransition component for animating section transitions
 * Uses framer-motion for smooth, configurable animations
 */
const PageTransition = ({ 
  children, 
  className = "",
  delay = 0,
  duration = 0.5,
  distance = 50,
  threshold = 0.1,
  once = true
}) => {
  // Default animation variants
  const variants = {
    hidden: { 
      opacity: 0, 
      y: distance 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: duration,
        ease: [0.25, 0.1, 0.25, 1.0], // Custom cubic bezier for a more cyberpunk feel
        delay: delay
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, threshold }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  duration: PropTypes.number,
  distance: PropTypes.number,
  threshold: PropTypes.number,
  once: PropTypes.bool
};

export default PageTransition;
// src/components/UI/PageAnimation.js
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

/**
 * PageAnimation wraps the entire page content to provide smooth
 * transitions between page navigation in Gatsby
 */
const PageAnimation = ({ children, location }) => {
  // Default page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0], // Custom cubic bezier
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location?.pathname || "default"}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

PageAnimation.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object,
};

export default PageAnimation;
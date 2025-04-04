// src/components/UI/PageTransitions.js
import React, { useEffect } from "react";

/**
 * Custom hook to add smooth transitions between sections
 */
const usePageTransitions = () => {
  useEffect(() => {
    // Skip on SSR
    if (typeof window === 'undefined') return;
    
    // Function to initialize page transitions
    const setupPageTransitions = () => {
      // Add transition styles dynamically
      if (!document.getElementById('page-transition-styles')) {
        const style = document.createElement('style');
        style.id = 'page-transition-styles';
        style.textContent = `
          .page-transition {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.4s ease, transform 0.4s ease;
          }
          
          .page-transition.visible {
            opacity: 1;
            transform: translateY(0);
          }
          
          .navigation-link {
            position: relative;
          }
          
          .navigation-link::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background-color: var(--color-neon-blue, #00f0ff);
            transition: width 0.3s ease;
          }
          
          .navigation-link:hover::after,
          .navigation-link.active::after {
            width: 100%;
          }
        `;
        document.head.appendChild(style);
      }
      
      // Get all main content sections
      const contentSections = document.querySelectorAll('main > section');
      
      // Add transition class
      contentSections.forEach(section => {
        if (!section.classList.contains('page-transition')) {
          section.classList.add('page-transition');
        }
      });
      
      // Function to show sections with delay
      function revealSections() {
        contentSections.forEach((section, index) => {
          setTimeout(() => {
            section.classList.add('visible');
          }, 100 * index);
        });
      }
      
      // Trigger initial animation
      revealSections();
      
      // Handle navigation links - for both buttons and anchors
      const navLinks = document.querySelectorAll('.navigation-link');
      navLinks.forEach(link => {
        // Skip if already processed by React
        // Navigation component uses buttons with click handlers
        if (link.tagName === 'BUTTON') {
          return;
        }
        
        // Only process anchor tags
        if (link.tagName === 'A') {
          // Remove any existing listeners first to prevent duplicates
          const newLink = link.cloneNode(true);
          link.parentNode.replaceChild(newLink, link);
          
          newLink.addEventListener('click', (e) => {
            // Only for same-page navigation
            const href = newLink.getAttribute('href');
            if (href && href.startsWith('#')) {
              e.preventDefault();
              
              const targetId = href.substring(1);
              const targetSection = document.getElementById(targetId);
              
              if (targetSection) {
                // Update active link styling
                navLinks.forEach(link => link.classList.remove('active'));
                newLink.classList.add('active');
              
                // Hide all sections
                contentSections.forEach(section => {
                  section.classList.remove('visible');
                });
                
                // Show target section after short delay
                setTimeout(() => {
                  // Scroll to section
                  targetSection.scrollIntoView({ behavior: 'smooth' });
                  
                  // Show section with animation
                  targetSection.classList.add('visible');
                }, 400);
              }
            }
          });
        }
      });
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupPageTransitions);
    } else {
      setupPageTransitions();
    }
    
    // Note: Route changes are handled by Gatsby's routing system
    
    // Clean up
    return () => {
      document.removeEventListener('DOMContentLoaded', setupPageTransitions);
    };
  }, []);
};

/**
 * Component to inject page transitions into layout
 */
const PageTransitions = () => {
  usePageTransitions();
  return null; // This is a utility component that doesn't render anything
};

export { usePageTransitions };
export default PageTransitions;
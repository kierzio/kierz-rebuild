// gatsby-browser.js
// Make THREE global for browser-only code
exports.onClientEntry = () => {
  // Set up globals that are provided for browser-only code
  if (typeof window !== 'undefined') {
    // Load Three.js globally
    import('three').then(THREE => {
      window.THREE = THREE;
    });
  }
};

// Handle route transitions
exports.onRouteUpdate = () => {
  // Run page transitions on route changes
  if (typeof window !== 'undefined') {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      // Get all content sections
      const contentSections = document.querySelectorAll('main > section');
      
      // Reset transition states
      contentSections.forEach(section => {
        section.classList.add('page-transition');
      });
      
      // Reveal sections with delay
      contentSections.forEach((section, index) => {
        setTimeout(() => {
          section.classList.add('visible');
        }, 100 * index);
      });
      
      // Update active nav link based on current path or hash
      const path = window.location.pathname;
      const hash = window.location.hash;
      
      const navLinks = document.querySelectorAll('.navigation-link');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Check if link matches current path/hash
        const isActive = (hash && href === hash) || 
                         (!hash && href === path) || 
                         (path === '/' && href === '#intro');
        
        if (isActive) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }, 100);
  }
  
  return true;
};
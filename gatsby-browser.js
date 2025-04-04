// gatsby-browser.js
// Set up browser-only code
exports.onClientEntry = () => {
  // Set up globals that are provided for browser-only code
  if (typeof window !== 'undefined') {
    try {
      // Load Three.js globally
      import('three').then(THREE => {
        window.THREE = THREE;
      }).catch(err => {
        console.error("Error loading Three.js:", err);
      });
    } catch (error) {
      console.error("Failed to set up global imports:", error);
    }
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
      
      // Setup project filters
      setupProjectFilters();
    }, 100);
  }
  
  return true;
};

// Setup project filters with animations
function setupProjectFilters() {
  if (typeof window === 'undefined') return;
  
  try {
    // Wait for DOM to be ready
    setTimeout(() => {
      try {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (!filterButtons.length || !projectCards.length) return;
    
    // Apply initial state - show all projects
    projectCards.forEach(card => {
      card.style.display = 'block';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.style.transition = 'opacity 0.3s ease, transform 0.4s ease, border-color 0.3s ease';
    });
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
      // Remove existing event listeners to prevent duplicates
      const newButton = button.cloneNode(true);
      if (button.parentNode) {
        button.parentNode.replaceChild(newButton, button);
      }
      
      newButton.addEventListener('click', () => {
        // Update active button state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        newButton.classList.add('active');
        
        const filterValue = newButton.getAttribute('data-filter');
        
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
      } catch (error) {
        console.error("Error setting up filter event listeners:", error);
      }
    }, 200);
  } catch (error) {
    console.error("Error in setupProjectFilters:", error);
  }
}
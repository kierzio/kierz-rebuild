// gatsby-browser.js
// Make THREE global for browser-only code
exports.onClientEntry = () => {
  // Set up globals that are provided for browser-only code
  if (typeof window !== 'undefined') {
    import('three').then(THREE => {
      window.THREE = THREE;
    });
  }
};
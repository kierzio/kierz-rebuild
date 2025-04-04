// gatsby-node.js
exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions
  
  // Use Deferred Static Generation (DSG) for home page
  // This prevents SSR of components with browser-specific APIs
  if (page.path === '/') {
    page.mode = 'DSG'
    createPage(page)
  }
}
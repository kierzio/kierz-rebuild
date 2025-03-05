# CODEBASE GUIDE

## Commands
- Build: `npm run build` or `yarn build`
- Develop: `npm run develop` or `yarn develop` 
- Serve: `npm run serve` or `yarn serve`
- Clean: `npm run clean` or `yarn clean`

## Code Style
- React components: Functional components with arrow functions
- Component naming: PascalCase (e.g., `Button`, `NavBar`)
- File structure: Components in index.js with named exports
- Imports: ESM style, group React imports first, then libs, then local
- Styling: Tailwind CSS with className approach
- Types: Use PropTypes for component props where applicable
- Error handling: try/catch with console.error for async operations
- State management: React hooks (useState, useCallback, useEffect)
- Component organization: pages/, components/, sections/, UI/

This is a Gatsby-based portfolio website using React and Tailwind CSS.
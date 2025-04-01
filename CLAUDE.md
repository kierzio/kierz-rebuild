# KIERZ.IO CODEBASE GUIDE

## Commands
- Develop: `npm run develop` or `yarn develop` (with hot reloading)
- Build: `npm run build` or `yarn build` (production build)
- Serve: `npm run serve` or `yarn serve` (test production build)
- Clean: `npm run clean` or `yarn clean` (clear cache)

## Code Style
- Components: Functional with arrow functions, organized in pages/, components/, sections/, UI/
- Naming: PascalCase for components, camelCase for variables/functions
- File structure: Components in index.js with named exports
- Imports: React first, then libraries, then local files
- Styling: Tailwind CSS utility classes, follow global.css variables
- Color scheme: Cyberpunk aesthetic with neon blue (#00f0ff), purple (#bf00ff) on dark backgrounds
- Typography: Orbitron for headings, Inter for body text
- Animations: Consistent fade-in effects, 60fps performance target (max 100 particles)
- Mobile-first: All components must be responsive
- Error handling: try/catch with console.error for async operations
- State: React hooks (useState, useCallback, useEffect) with localStorage for persistence
- PropTypes: Use for all components with public interfaces

This is a Gatsby-based cyberpunk portfolio website using React 18 and Tailwind CSS.
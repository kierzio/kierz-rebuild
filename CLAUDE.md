# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# KIERZ.IO CODEBASE GUIDE

## Commands
- Develop: `npm run develop` or `yarn develop` (with hot reloading)
- Build: `npm run build` or `yarn build` (production build)
- Serve: `npm run serve` or `yarn serve` (test production build)
- Clean: `npm run clean` or `yarn clean` (clear cache)
- Lint: Format code with 2-space indentation

## Code Style
- Components: Functional with arrow functions, organized in pages/, components/Sections/, components/UI/
- Naming: PascalCase for components, camelCase for variables/functions
- File structure: Components in index.js with named exports
- Imports: React first, then libraries, then local files
- Styling: Tailwind CSS utility classes, follow global.css variables
- Color scheme: Cyberpunk aesthetic with neon blue (#00f0ff), purple (#bf00ff) on dark backgrounds
- Typography: Orbitron for headings, Inter for body text
- Animations: Consistent fade-in effects, 60fps performance target (max 100 particles)
- Mobile-first: All components must be responsive
- Error handling: try/catch with async/await for async operations, console.error for debugging
- State: React hooks (useState, useCallback, useEffect) with localStorage for persistence
- Formatting: 2-space indentation, descriptive variable names aligned with cyberpunk theme
- Performance: Lazy load sections below the fold, implement proper cleanup in useEffect

This is a Gatsby-based cyberpunk portfolio website using React 18 and Tailwind CSS.
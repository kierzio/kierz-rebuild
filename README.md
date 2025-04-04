# Kierz.io Portfolio

A cyberpunk-themed portfolio website built with Gatsby.js and React.

## Features

- Cyberpunk design with neon colors and animated elements
- Interactive 3D network visualization
- Particle effects and animations
- Context-aware MARCS chatbot assistant
- Responsive design for all device sizes

## MARCS Chatbot

The MARCS (Multi-Adaptive Responsive Conversational System) chatbot provides context-aware responses based on which section of the site the user is viewing. Key features include:

- Automatically detects current page section (home, about, projects, contact)
- Connects to a Flask-based API backend
- Supports both JSON and legacy text endpoints
- Graceful fallback mechanism if primary endpoint fails
- Cyberpunk styling with animated eye interface

## Development

```bash
# Install dependencies
yarn install

# Start development server
yarn develop

# Build for production
yarn build

# Serve production build locally
yarn serve
```

## Technologies

- React 18
- Gatsby.js
- TailwindCSS
- Framer Motion
- Three.js
- Axios

## License

Copyright © 2025 Kierz.io. All rights reserved.
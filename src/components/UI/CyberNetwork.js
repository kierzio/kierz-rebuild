// src/components/UI/CyberNetwork.js
import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * Interactive 3D network visualization using Three.js
 * Creates a dynamic network of nodes and connections that respond to user interaction
 * 
 * Three.js is imported dynamically in useEffect to prevent SSR issues with Gatsby
 */
const CyberNetwork = ({
  className = "",
  nodeCount = 50,
  nodeColor = "#00f0ff",
  linkColor = "#bf00ff",
  backgroundColor = "#0a0028",
  interactionStrength = 0.2,
  maxSpeed = 0.3,
  dataPoints = null // Optional array of data points for custom node positioning
}) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const nodesRef = useRef([]);
  const linksRef = useRef([]);
  const mouseRef = useRef(null);
  const raycasterRef = useRef(null);
  const frameIdRef = useRef(null);
  const isActiveRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Check if we're in the browser
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize the 3D scene
  useEffect(() => {
    if (!isClient || !containerRef.current) return;
    
    // Dynamically import Three.js to avoid SSR issues
    let THREE;
    let cleanup = () => {};
    
    const initThree = async () => {
      try {
        THREE = await import('three');
        
        // Setup scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(backgroundColor);
        sceneRef.current = scene;
        
        // Setup camera
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 30;
        cameraRef.current = camera;
        
        // Setup renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;
        
        // Setup raycaster and mouse vector
        mouseRef.current = new THREE.Vector2();
        raycasterRef.current = new THREE.Raycaster();
        
        // Initialize network
        initializeNetwork(THREE);
        
        // Set up event listeners
        window.addEventListener('resize', handleResize);
        containerRef.current.addEventListener('mousemove', handleMouseMove);
        containerRef.current.addEventListener('mouseenter', () => { isActiveRef.current = true; });
        containerRef.current.addEventListener('mouseleave', () => { isActiveRef.current = false; });
        
        // Start animation
        animate();
        setIsLoaded(true);
        
        // Define cleanup function
        cleanup = () => {
          window.removeEventListener('resize', handleResize);
          if (containerRef.current) {
            containerRef.current.removeEventListener('mousemove', handleMouseMove);
            containerRef.current.removeEventListener('mouseenter', () => { isActiveRef.current = true; });
            containerRef.current.removeEventListener('mouseleave', () => { isActiveRef.current = false; });
          }
          
          if (frameIdRef.current !== null) {
            cancelAnimationFrame(frameIdRef.current);
          }
          
          if (rendererRef.current && containerRef.current) {
            containerRef.current.removeChild(rendererRef.current.domElement);
          }
          
          // Clean up THREE.js resources
          if (sceneRef.current) {
            sceneRef.current.traverse((object) => {
              if (object.geometry) object.geometry.dispose();
              if (object.material) {
                if (Array.isArray(object.material)) {
                  for (const material of object.material) {
                    material.dispose();
                  }
                } else {
                  object.material.dispose();
                }
              }
            });
          }
          
          if (rendererRef.current) {
            rendererRef.current.dispose();
          }
        };
      } catch (error) {
        console.error("Failed to initialize Three.js:", error);
      }
    };
    
    initThree();
    
    // Cleanup function
    return () => {
      cleanup();
    };
  }, [isClient, backgroundColor, nodeCount, nodeColor, linkColor, interactionStrength, maxSpeed]);
  
  // Initialize network nodes and connections
  const initializeNetwork = (THREE) => {
    if (!THREE || !sceneRef.current) return;
    
    const scene = sceneRef.current;
    
    // Clear existing nodes and links
    nodesRef.current.forEach(node => scene.remove(node));
    linksRef.current.forEach(link => scene.remove(link));
    nodesRef.current = [];
    linksRef.current = [];
    
    // Create nodes
    const nodeGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({ 
      color: new THREE.Color(nodeColor),
      transparent: true,
      opacity: 0.8
    });
    
    // Use provided data points or generate random positions
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
      
      // Position nodes
      if (dataPoints && dataPoints[i]) {
        const { x, y, z } = dataPoints[i];
        node.position.set(x, y, z || 0);
      } else {
        node.position.x = Math.random() * 40 - 20;
        node.position.y = Math.random() * 40 - 20;
        node.position.z = Math.random() * 10 - 5;
      }
      
      // Add velocity for animation
      node.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.02
        ),
        originalPos: node.position.clone(),
        // Randomly vary node size
        scale: Math.random() * 0.5 + 0.8
      };
      
      // Apply scale variation
      node.scale.set(
        node.userData.scale,
        node.userData.scale,
        node.userData.scale
      );
      
      scene.add(node);
      nodes.push(node);
    }
    
    nodesRef.current = nodes;
    
    // Create links between nodes
    const links = [];
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: new THREE.Color(linkColor),
      transparent: true,
      opacity: 0.3
    });
    
    // Connect each node to its closest neighbors
    nodes.forEach((node, i) => {
      // Calculate distances to all other nodes
      const distances = nodes.map((other, j) => {
        if (i === j) return Infinity;
        return node.position.distanceTo(other.position);
      });
      
      // Find 2-3 closest nodes and connect
      const maxLinks = Math.floor(Math.random() * 2) + 2; // 2-3 links per node
      for (let k = 0; k < maxLinks; k++) {
        const minIndex = distances.indexOf(Math.min(...distances));
        if (minIndex !== -1 && distances[minIndex] < 15) {
          const other = nodes[minIndex];
          
          // Create line geometry
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            node.position,
            other.position
          ]);
          
          const line = new THREE.Line(lineGeometry, lineMaterial.clone());
          line.userData = {
            startNode: node,
            endNode: other
          };
          
          scene.add(line);
          links.push(line);
          
          // Mark as processed to avoid duplicate connections
          distances[minIndex] = Infinity;
        }
      }
    });
    
    linksRef.current = links;
  };
  
  // Handle window resize
  const handleResize = () => {
    if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    
    rendererRef.current.setSize(width, height);
  };
  
  // Handle mouse movement
  const handleMouseMove = (event) => {
    if (!containerRef.current || !mouseRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1;
    mouseRef.current.y = -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1;
  };
  
  // Animation loop
  const animate = () => {
    frameIdRef.current = requestAnimationFrame(animate);
    
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
    
    // Update node positions
    nodesRef.current.forEach(node => {
      // Apply momentum
      node.position.add(node.userData.velocity);
      
      // Boundary check - keep nodes within container
      if (Math.abs(node.position.x) > 25) {
        node.userData.velocity.x *= -1;
      }
      if (Math.abs(node.position.y) > 25) {
        node.userData.velocity.y *= -1;
      }
      if (Math.abs(node.position.z) > 10) {
        node.userData.velocity.z *= -1;
      }
      
      // Limit maximum speed
      const speed = node.userData.velocity.length();
      if (speed > maxSpeed) {
        node.userData.velocity.multiplyScalar(maxSpeed / speed);
      }
      
      // Add small random movement for more organic feel
      node.userData.velocity.x += (Math.random() - 0.5) * 0.005;
      node.userData.velocity.y += (Math.random() - 0.5) * 0.005;
      node.userData.velocity.z += (Math.random() - 0.5) * 0.002;
      
      // Apply slight drag/friction
      node.userData.velocity.multiplyScalar(0.99);
    });
    
    // Update line positions to follow connected nodes
    linksRef.current.forEach(link => {
      if (link.userData.startNode && link.userData.endNode) {
        const startPos = link.userData.startNode.position;
        const endPos = link.userData.endNode.position;
        
        // Update line geometry
        const points = [startPos, endPos];
        link.geometry.setFromPoints(points);
        
        // Fade links based on distance
        const distance = startPos.distanceTo(endPos);
        const maxDistance = 20;
        
        // Make links fade out when nodes are far apart
        if (distance > maxDistance) {
          link.material.opacity = 0;
        } else {
          link.material.opacity = 0.3 * (1 - distance / maxDistance);
        }
      }
    });
    
    // Handle mouse interaction
    if (isActiveRef.current && mouseRef.current && raycasterRef.current) {
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      
      // Cast ray to find intersected objects
      const intersects = raycasterRef.current.intersectObjects(nodesRef.current);
      
      // Reset all nodes to normal color
      nodesRef.current.forEach(node => {
        node.material.color.set(nodeColor);
        node.material.opacity = 0.8;
      });
      
      // If no direct intersection, use the mouse position for repulsion
      if (intersects.length === 0) {
        if (!raycasterRef.current || !raycasterRef.current.ray) return;
        
        const mouseRay = raycasterRef.current.ray.direction.clone().multiplyScalar(20);
        mouseRay.add(cameraRef.current.position);
        
        nodesRef.current.forEach(node => {
          const distanceToMouse = node.position.distanceTo(mouseRay);
          if (distanceToMouse < 10) {
            // Apply repulsion or attraction based on mouse position
            const forceDirection = node.position.clone().sub(mouseRay);
            const forceMagnitude = (10 - distanceToMouse) * interactionStrength;
            forceDirection.normalize().multiplyScalar(forceMagnitude);
            node.userData.velocity.add(forceDirection);
            
            // Slight color shift effect
            if (node.material.color.setHSL) {
              const hue = (distanceToMouse / 10);
              node.material.color.setHSL(hue, 1, 0.5);
              node.material.opacity = 1;
            }
          }
        });
      } 
      // If a node is intersected, highlight it and its connections
      else {
        const intersectedNode = intersects[0].object;
        
        // Highlight intersected node
        if (intersectedNode.material && intersectedNode.material.color) {
          intersectedNode.material.color.set("#ffffff");
          intersectedNode.material.opacity = 1;
        }
        
        // Find and highlight connected nodes and links
        linksRef.current.forEach(link => {
          if (link.userData.startNode === intersectedNode || link.userData.endNode === intersectedNode) {
            const connectedNode = link.userData.startNode === intersectedNode 
              ? link.userData.endNode 
              : link.userData.startNode;
            
            // Highlight connected node
            if (connectedNode.material && connectedNode.material.color) {
              connectedNode.material.color.set("#bf00ff");
              connectedNode.material.opacity = 1;
            }
            
            // Highlight link
            if (link.material && link.material.color) {
              link.material.color.set("#ffffff");
              link.material.opacity = 0.8;
            }
          }
        });
      }
    }
    
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  };
  
  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 ${className}`}
      style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 1s ease' }}
    />
  );
};

CyberNetwork.propTypes = {
  className: PropTypes.string,
  nodeCount: PropTypes.number,
  nodeColor: PropTypes.string,
  linkColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  interactionStrength: PropTypes.number,
  maxSpeed: PropTypes.number,
  dataPoints: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    z: PropTypes.number
  }))
};

export default CyberNetwork;
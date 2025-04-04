// Helper functions for the game
import { Vector3 } from 'three';

// Calculate the shortest distance from a point to a line segment (for road collision detection)
export const distanceToLineSegment = (point, lineStart, lineEnd) => {
  const lineVector = new Vector3().subVectors(lineEnd, lineStart);
  const pointVector = new Vector3().subVectors(point, lineStart);
  
  const lineLength = lineVector.length();
  const lineDirection = lineVector.clone().normalize();
  
  const projection = pointVector.dot(lineDirection);
  
  if (projection <= 0) {
    return pointVector.length();
  }
  
  if (projection >= lineLength) {
    return new Vector3().subVectors(point, lineEnd).length();
  }
  
  const projectionVector = lineDirection.multiplyScalar(projection);
  const nearestPoint = new Vector3().addVectors(lineStart, projectionVector);
  
  return new Vector3().subVectors(point, nearestPoint).length();
};

// Generate a random position along a road
export const randomPositionOnRoad = (roads) => {
  // Pick a random road
  const road = roads[Math.floor(Math.random() * roads.length)];
  
  // Pick a random position along the road
  const t = Math.random();
  const x = road.start[0] * (1 - t) + road.end[0] * t;
  const z = road.start[2] * (1 - t) + road.end[2] * t;
  
  return [x, 0, z];
};

// Check if a point is on a road
export const isOnRoad = (position, roads, roadMargin = 4) => {
  const point = new Vector3(position[0], 0, position[2]);
  
  for (const road of roads) {
    const start = new Vector3(road.start[0], 0, road.start[2]);
    const end = new Vector3(road.end[0], 0, road.end[2]);
    
    const distance = distanceToLineSegment(point, start, end);
    
    if (distance <= roadMargin) {
      return true;
    }
  }
  
  return false;
};

// Get texture path with error fallback
export const getTexturePath = (type, category) => {
  try {
    return `/assets/textures/${category}/${type}.jpg`;
  } catch (e) {
    console.warn(`Texture not found for ${category}/${type}, using fallback`);
    return `/assets/textures/${category}/default.jpg`;
  }
};

// Optimize model to reduce polygon count (level of detail)
export const optimizeModel = (detail = 'medium') => {
  // Return a config object for LOD implementation
  // This would be used in production with actual detailed models
  switch (detail) {
    case 'high':
      return { segments: 16, scale: 1 };
    case 'medium':
      return { segments: 8, scale: 1 };
    case 'low':
      return { segments: 4, scale: 1 };
    default:
      return { segments: 8, scale: 1 };
  }
};
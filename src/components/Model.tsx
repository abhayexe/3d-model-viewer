import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect } from 'react';

interface ModelProps {
  url: string;
  scaleMultiplier?: number;
  position?: [number, number, number];
  animationIndex?: number; // Optional index of animation to play
  autoPlay?: boolean; // Whether to auto-play animation
}

export function Model({ 
  url, 
  scaleMultiplier = 1, 
  position = [0, 0, 0],
  animationIndex = 0,
  autoPlay = true 
}: ModelProps) {
  // Load both the model and its animations
  const { scene, animations } = useGLTF(url);
  const { actions, names } = useAnimations(animations, scene);
  
  // Enable shadows for all meshes in the model
  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);
  
  // Handle animations if they exist
  useEffect(() => {
    if (names.length > 0 && autoPlay) {
      // Ensure animation index is within bounds
      const validIndex = Math.min(animationIndex, names.length - 1);
      const action = actions[names[validIndex]];
      
      if (action) {
        action.reset().fadeIn(0.5).play();
        
        // Cleanup function to stop animation when component unmounts
        return () => {
          action.fadeOut(0.5);
        };
      }
    }
  }, [actions, names, animationIndex, autoPlay]);
  
  // Apply uniform scaling using the scale multiplier
  const scale = [scaleMultiplier, scaleMultiplier, scaleMultiplier];

  return <primitive object={scene} scale={scale} position={position} />;
}

// Add type safety for the GLTF result
useGLTF.preload = (url: string) => {
  return useGLTF(url);
};
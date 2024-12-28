// import { useRef, useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import { Group } from 'three';
// import { Model } from './Model';
// import { Lighting } from './Lighting';
// import { PostProcessing } from './PostProcessing';
// import { PostProcessing2 } from './postprocessing2';

// import { DropZone } from './DropZone';
// import { Environment } from '@react-three/drei';
// import ReflectivePlane from './ReflectivePlane'; 
// import { Rings } from './Rings';
// import { Boxes } from './Boxes';
// import * as THREE from 'three';

// export default function ModelViewer() {
//   const [modelUrl, setModelUrl] = useState<string | null>(null);
//   const dropRef = useRef<HTMLDivElement>(null);
//   const modelRef = useRef<Group>(null);

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     const file = e.dataTransfer.files[0];
//     if (file && file.name.endsWith('.glb')) {
//       const url = URL.createObjectURL(file);
//       setModelUrl(url);
//     }
//   };

//   return (
//     <div 
//       ref={dropRef}
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//       className="w-full h-screen bg-gray-900 relative"
//     >
//       {!modelUrl && (
//         <DropZone onDragOver={handleDragOver} onDrop={handleDrop} />
//       )}
      
//       <Canvas
//         shadows
//         camera={{ position: [0, 2, 5], fov: 50 }}
//         gl={{ antialias: true }}
//       >
//         <color 
//         attach="background" 
//         args={['#ffffff']} 
//         // args={['#000000']} 
//         />
        


        
        
        
        
        
        
        
        
        
//         {modelUrl && (
//           <group ref={modelRef}>
//             <Model url={modelUrl} 
//             // scaleMultiplier={0.01} 
//             // scaleMultiplier={30} 
//             position={[0,0,0]}/>
//           </group>
//         )}
//         <Environment 
//           preset="city" 
//           background 
//           backgroundBlurriness={0.0} 
//         />
        
//         {/* <Lighting />  */}
        

//         <mesh 
//           rotation={[-Math.PI / 2, 0, 0]} 
//           position={[0, -0.05, 0]}
//           // position={[0, -2.2, 0]} 
//           receiveShadow
//         >
//           {/* <planeGeometry args={[50, 50]} /> */}
//           <meshStandardMaterial 
//           color="#ffffff" 
//           metalness={0} 
//           emissive={new THREE.Color(10, 10, 10)}
//           emissiveIntensity={0}
//           // side={THREE.DoubleSide}       
//           roughness={1}/>
//         </mesh>
//         {/* <ReflectivePlane /> */}
        

//         <OrbitControls makeDefault />
        
//         <PostProcessing/>
//         {/* <PostProcessing2/> */}
//         {/* <Rings />
//         <Boxes/> */}
//       </Canvas>
//     </div>
//   );
// }


import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Group } from 'three';
import { Model } from './Model';
import { Lighting } from './Lighting';
import { PostProcessing } from './PostProcessing';
import { PostProcessing2 } from './postprocessing2';
import { DropZone } from './DropZone';
import { Environment } from '@react-three/drei';
import ReflectivePlane from './ReflectivePlane';
import { Rings } from './Rings';
import { Boxes } from './Boxes';
import FloatingNote from './FloatingNote';
import * as THREE from 'three';

const ENVIRONMENT_PRESETS = [
  'apartment',
  'city',
  'dawn',
  'forest',
  'lobby',
  'night',
  'park',
  'studio',
  'sunset',
  'warehouse'
];

export default function ModelViewer() {
  const [modelUrl, setModelUrl] = useState(null);
  
  const [settings, setSettings] = useState({
    backgroundColor: '#ffffff',
    showLighting: false,
    showReflectivePlane: false,
    showRings: false,
    showBoxes: false,
    usePostProcessing1: true,
    usePostProcessing2: false,
    planeSettings: {
      visible: true,
      emissiveIntensity: 0,
      metalness: 0,
      roughness: 1,
      yPosition: -0.05
    },
    modelScale: 1,
    modelPosition: [0, 0, 0],
    environmentSettings: {
      enabled: true,
      preset: 'city',
      background: true,
      backgroundBlurriness: 0
    }
  });

  const dropRef = useRef(null);
  const modelRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.glb')) {
      const url = URL.createObjectURL(file);
      setModelUrl(url);
    }
  };

  const updateSettings = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updatePlaneSettings = (key, value) => {
    setSettings(prev => ({
      ...prev,
      planeSettings: {
        ...prev.planeSettings,
        [key]: value
      }
    }));
  };

  const updateEnvironmentSettings = (key, value) => {
    setSettings(prev => ({
      ...prev,
      environmentSettings: {
        ...prev.environmentSettings,
        [key]: value
      }
    }));
  };

  return (
    <div className="flex h-screen">
      {/* Control Panel */}
      <div className="w-64 bg-gray-800 p-4 overflow-y-auto">
        <div className="space-y-4 text-white">
          <h2 className="text-xl font-bold mb-4">Settings</h2>
          
          {/* Environment Settings */}
          <div className="space-y-2 border-b border-gray-700 pb-4">
            <h3 className="font-bold">Environment</h3>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.environmentSettings.enabled}
                onChange={(e) => updateEnvironmentSettings('enabled', e.target.checked)}
                className="mr-2"
              />
              Enable Environment
            </label>

            <div>
              <label className="block mb-1">Preset</label>
              <select
                value={settings.environmentSettings.preset}
                onChange={(e) => updateEnvironmentSettings('preset', e.target.value)}
                className="w-full bg-gray-700 p-2 rounded"
              >
                {ENVIRONMENT_PRESETS.map(preset => (
                  <option key={preset} value={preset}>
                    {preset.charAt(0).toUpperCase() + preset.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.environmentSettings.background}
                onChange={(e) => updateEnvironmentSettings('background', e.target.checked)}
                className="mr-2"
              />
              Show as Background
            </label>

            <>
  <FloatingNote />
  {/* rest of your viewer code */}
</>

            <div>
              <label className="block mb-1">Background Blur</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.environmentSettings.backgroundBlurriness}
                onChange={(e) => updateEnvironmentSettings('backgroundBlurriness', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Background Color */}
          <div>
            <label className="block mb-2">Background Color</label>
            <input
              type="color"
              value={settings.backgroundColor}
              onChange={(e) => updateSettings('backgroundColor', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Toggle Switches */}
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.showLighting}
                onChange={(e) => updateSettings('showLighting', e.target.checked)}
                className="mr-2"
              />
              Show Lighting
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.showReflectivePlane}
                onChange={(e) => updateSettings('showReflectivePlane', e.target.checked)}
                className="mr-2"
              />
              Show Reflective Plane
            </label>
            

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.showRings}
                onChange={(e) => updateSettings('showRings', e.target.checked)}
                className="mr-2"
              />
              Show Rings
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.showBoxes}
                onChange={(e) => updateSettings('showBoxes', e.target.checked)}
                className="mr-2"
              />
              Show Boxes
            </label>
          </div>

          {/* Post-processing */}
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.usePostProcessing1}
                onChange={(e) => updateSettings('usePostProcessing1', e.target.checked)}
                className="mr-2"
              />
              Post-Processing 1
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.usePostProcessing2}
                onChange={(e) => updateSettings('usePostProcessing2', e.target.checked)}
                className="mr-2"
              />
              Post-Processing 2
            </label>
          </div>

          {/* Plane Settings */}
          <div className="space-y-2">
            <h3 className="font-bold">Plane Settings</h3>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.planeSettings.visible}
                onChange={(e) => updatePlaneSettings('visible', e.target.checked)}
                className="mr-2"
              />
              Show Plane
            </label>

            <div>
              <label className="block mb-1">Emissive Intensity</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.planeSettings.emissiveIntensity}
                onChange={(e) => updatePlaneSettings('emissiveIntensity', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block mb-1">Metalness</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.planeSettings.metalness}
                onChange={(e) => updatePlaneSettings('metalness', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block mb-1">Roughness</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.planeSettings.roughness}
                onChange={(e) => updatePlaneSettings('roughness', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block mb-1">Y Position</label>
              <input
                type="number"
                value={settings.planeSettings.yPosition}
                onChange={(e) => updatePlaneSettings('yPosition', parseFloat(e.target.value))}
                className="w-full bg-gray-700 p-1"
              />
            </div>
          </div>

          {/* Model Settings */}
          <div className="space-y-2">
            <h3 className="font-bold">Model Settings</h3>
            
            <div>
              <label className="block mb-1">Scale</label>
              <input
                type="number"
                value={settings.modelScale}
                onChange={(e) => updateSettings('modelScale', parseFloat(e.target.value))}
                className="w-full bg-gray-700 p-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3D Viewer */}
      <div 
        ref={dropRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex-1 bg-gray-900 relative"
      >
        {!modelUrl && (
          <DropZone onDragOver={handleDragOver} onDrop={handleDrop} />
        )}
        
        <Canvas
          shadows
          camera={{ position: [0, 2, 5], fov: 50 }}
          gl={{ antialias: true }}
        >
          <color attach="background" args={[settings.backgroundColor]} />
          
          {settings.showLighting && <Lighting />}
          
          {modelUrl && (
            <group ref={modelRef}>
              <Model 
                url={modelUrl}
                scaleMultiplier={settings.modelScale}
                position={settings.modelPosition}
              />
            </group>
          )}

          {settings.environmentSettings.enabled && (
            <Environment 
              preset={settings.environmentSettings.preset}
              background={settings.environmentSettings.background}
              backgroundBlurriness={settings.environmentSettings.backgroundBlurriness}
            />
          )}

          {settings.planeSettings.visible && (
            <mesh 
              rotation={[-Math.PI / 2, 0, 0]} 
              position={[0, settings.planeSettings.yPosition, 0]}
              receiveShadow
            >
              <planeGeometry args={[50, 50]} />
              <meshStandardMaterial 
                color="#ffffff"
                metalness={settings.planeSettings.metalness}
                emissive={new THREE.Color(10, 10, 10)}
                emissiveIntensity={settings.planeSettings.emissiveIntensity}
                roughness={settings.planeSettings.roughness}
              />
            </mesh>
          )}

          {settings.showReflectivePlane && <ReflectivePlane />}
          
          <OrbitControls makeDefault />
          
          {settings.usePostProcessing1 && <PostProcessing />}
          {settings.usePostProcessing2 && <PostProcessing2 />}
          {settings.showRings && <Rings />}
          {settings.showBoxes && <Boxes />}
          
        </Canvas>
      </div>
    </div>
  );
}
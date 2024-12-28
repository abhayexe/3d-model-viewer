import { useRef } from 'react';
import { DirectionalLight, DirectionalLightHelper, CameraHelper } from 'three';
import { useHelper } from '@react-three/drei';

export function Lighting() {
  const lightRef = useRef<DirectionalLight>(null);

  // Uncomment to debug shadow camera
  // useHelper(lightRef, DirectionalLightHelper, 1, 'red');
  // useHelper(lightRef, CameraHelper);

  return (
    <>
      <directionalLight
        ref={lightRef}
        // color="cdfdff"
        position={[5, 15, 5]}
        intensity={4.5}
        castShadow
        shadow-bias={-0.01}
        shadow-mapSize={[4096, 4096]}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
      />
      <ambientLight intensity={.0} />
      <hemisphereLight
        intensity={0.5}
        color="#ffffff"
        groundColor="#444444"
      />
    </>
  );
}
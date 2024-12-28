import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color, Mesh, MeshStandardMaterial } from "three";

export function Rings() {
  // Type for the itemsRef
  const itemsRef = useRef<(Mesh | null)[]>([]);

  useFrame((state, delta) => {
    let elapsed = state.clock.getElapsedTime();

    for (let i = 0; i < itemsRef.current.length; i++) {
      const mesh = itemsRef.current[i];
      if (!mesh) continue; // Skip if the ref is null
      
      let z = (i - 7) * 3.5 + ((elapsed * 0.4) % 3.5) * 2;
      let dist = Math.abs(z);
      mesh.position.set(0, 0, -z);
      mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04);

      let colorScale = 1;
      if (dist > 2) {
        colorScale = 1 - (Math.min(dist, 12) - 2) / 10;
      }
      colorScale *= 0.5;

      const material = mesh.material as MeshStandardMaterial;

      if (i % 2 === 1) {
        material.emissive = new Color(6, 0.15, 0.7).multiplyScalar(colorScale);
      } else {
        material.emissive = new Color(0.1, 0.7, 3).multiplyScalar(colorScale);
      }
    }
  });

  return (
    <>
      {[...Array(14)].map((_, i) => (
        <mesh
          castShadow
          receiveShadow
          position={[0, 0, 0]}
          key={i}
          ref={(el) => (itemsRef.current[i] = el)}
        >
          <torusGeometry args={[3.35, 0.05, 16, 100]} />
          <meshStandardMaterial emissive={[4, 0.1, 0.4]} color={[0, 0, 0]} />
        </mesh>
      ))}
    </>
  );
}

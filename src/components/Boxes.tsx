import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, Color, Mesh, MeshStandardMaterial } from "three";

interface BoxProps {
  color: [number, number, number];
}

const emissiveColors: Color[] = [
  new Color("#FFD700"),  // Yellow
  new Color("#FF4500"),  // Orange
  new Color("#32CD32"),  // Green
  new Color("#FF69B4"),  // Hot Pink
  new Color("#00FFFF"),  // Cyan
];

function Box({ color }: BoxProps) {
  const box = useRef<Mesh>(null);
  const time = useRef<number>(0);
  const [position, setPosition] = useState<Vector3>(getInitialPosition());
  const [xRotSpeed] = useState<number>(() => Math.random());
  const [yRotSpeed] = useState<number>(() => Math.random());
  const [scale] = useState<number>(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);
  const [emissiveColor] = useState<Color>(() => 
    emissiveColors[Math.floor(Math.random() * emissiveColors.length)].clone()
  );
  const [emissiveIntensity] = useState<number>(() => Math.random() * 0.5 + 0.5);

  function getInitialPosition(): Vector3 {
    const v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      (Math.random() * 2 - 1) * 15
    );
    if (v.x < 0) v.x -= 1.75;
    if (v.x > 0) v.x += 1.75;
    return v;
  }

  function resetPosition(): void {
    const v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      Math.random() * 10 + 10
    );
    if (v.x < 0) v.x -= 1.75;
    if (v.x > 0) v.x += 1.75;
    setPosition(v);
  }

  useFrame((state, delta) => {
    if (!box.current) return;

    time.current += delta * 1.2;
    const newZ = position.z - time.current;

    if (newZ < -10) {
      resetPosition();
      time.current = 0;
    }

    box.current.position.set(position.x, position.y, newZ);
    box.current.rotation.x += delta * xRotSpeed;
    box.current.rotation.y += delta * yRotSpeed;

    // Update material properties if needed
    const material = box.current.material as MeshStandardMaterial;
    material.emissive = emissiveColor;
    material.emissiveIntensity = emissiveIntensity;
  }, [xRotSpeed, yRotSpeed, position]);

  return (
    <mesh
      ref={box}
      rotation-x={Math.PI * 0.5}
      scale={scale}
      castShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={new Color(color[0], color[1], color[2])}
        emissive={emissiveColor}
        emissiveIntensity={emissiveIntensity}
        envMapIntensity={0.15}
      />
    </mesh>
  );
}

export function Boxes() {
  const [arr] = useState<number[]>(() => {
    const a = [];
    for (let i = 0; i < 100; i++) a.push(0);
    return a;
  });

  return (
    <>
      {arr.map((e, i) => (
        <Box
          key={i}
          color={i % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]}
        />
      ))}
    </>
  );
}
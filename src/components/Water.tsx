import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useThree, useFrame, useLoader } from '@react-three/fiber'
import { Water } from 'three-stdlib'
import { extend } from '@react-three/fiber'

// Extend Water to make it available as a JSX element
extend({ Water })

interface WaterProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
  waterColor?: number
  size?: number
}

export function Water3D({
  position = [0, 0, 0],
  rotation = [-Math.PI / 2, 0, 0],
  scale = [1, 1, 1],
  waterColor = 0x001e0f,
  size = 10000
}: WaterProps) {
  const ref = useRef<any>()
  const gl = useThree((state) => state.gl)
  
  // Load water normal texture
  const waterNormals = useLoader(THREE.TextureLoader, 'waternormals.jpeg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping

  // Create geometry
  const geom = useMemo(() => new THREE.PlaneGeometry(size, size), [size])

  // Configure water material
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding
    }),
    [waterNormals, waterColor, gl.encoding]
  )

  // Animate water
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.time.value += delta
    }
  })

  return (
    <water
      ref={ref}
      args={[geom, config]}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  )
}
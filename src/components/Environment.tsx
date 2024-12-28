import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { PMREMGenerator, TextureLoader, EquirectangularReflectionMapping } from 'three'

interface EnvironmentProps {
  path: string;
  background?: boolean;
}

export function Environment({ path, background = false }: EnvironmentProps) {
  const { scene, gl } = useThree()

  useEffect(() => {
    console.log('Loading environment map from:', path)
    
    const pmremGenerator = new PMREMGenerator(gl)
    pmremGenerator.compileEquirectangularShader()

    const loader = new TextureLoader()
    
    loader.load(
      path,
      (texture) => {
        console.log('Texture loaded successfully')
        texture.mapping = EquirectangularReflectionMapping
        
        const envMap = pmremGenerator.fromEquirectangular(texture).texture
        
        if (background) {
          scene.background = envMap
          console.log('Background set')
        }
        scene.environment = envMap
        console.log('Environment set')
        
        texture.dispose()
        pmremGenerator.dispose()
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%')
      },
      (error) => {
        console.error('Error loading environment texture:', error)
      }
    )

    return () => {
      if (background) {
        scene.background = null
      }
      scene.environment = null
    }
  }, [path, background, scene, gl])

  return null
}
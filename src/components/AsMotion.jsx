
import { useGLTF } from '@react-three/drei'
import { useMotionValue, useSpring } from 'motion/react';
import { useEffect } from 'react';


const Model = () => {
  const gltf = useGLTF('/robot.glb');
  return <primitive object={gltf.scene} />
}

const AsMotion = () => {
  const ypostion = useMotionValue(5);
  const yspring = useSpring(ypostion , {damping:30})
  useEffect(()=>{
    yspring.set(-1);
  } , [yspring])
  return (

          <Model  />
  )
}

export default AsMotion
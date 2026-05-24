'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color="#00f0ff"
          attach="material"
          distort={0.5}
          speed={3}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  )
}

function EnergyRings() {
  const group1Ref = useRef<THREE.Group>(null)
  const group2Ref = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (group1Ref.current) {
      group1Ref.current.rotation.x = state.clock.elapsedTime * 0.5
      group1Ref.current.rotation.y = state.clock.elapsedTime * 0.3
    }
    if (group2Ref.current) {
      group2Ref.current.rotation.x = -state.clock.elapsedTime * 0.3
      group2Ref.current.rotation.z = state.clock.elapsedTime * 0.4
    }
  })

  return (
    <>
      <group ref={group1Ref}>
        <mesh>
          <torusGeometry args={[2, 0.03, 16, 100]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} />
        </mesh>
      </group>
      <group ref={group2Ref}>
        <mesh>
          <torusGeometry args={[2.3, 0.02, 16, 100]} />
          <meshBasicMaterial color="#ff00aa" transparent opacity={0.4} />
        </mesh>
      </group>
    </>
  )
}

export default function ContactOrb() {
  return (
    <div className="w-full h-[300px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#00f0ff" />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff00aa" />
          
          <FloatingOrb />
          <EnergyRings />
        </Suspense>
      </Canvas>
    </div>
  )
}

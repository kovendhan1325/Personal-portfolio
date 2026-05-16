'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Float } from '@react-three/drei'
import { Suspense, useRef, useMemo } from 'react'
import * as THREE from 'three'

interface SkillNodeProps {
  position: [number, number, number]
  skill: string
  color: string
}

function SkillNode({ position, skill, color }: SkillNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <Html
          position={[0, 0.6, 0]}
          center
          distanceFactor={8}
          style={{
            transition: 'all 0.2s',
            opacity: 1,
            pointerEvents: 'none'
          }}
        >
          <div className="glass px-2 py-1 rounded text-xs font-mono text-foreground whitespace-nowrap">
            {skill}
          </div>
        </Html>
      </group>
    </Float>
  )
}

function OrbitRing({ radius, color, speed }: { radius: number; color: string; speed: number }) {
  const ringRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * speed
    }
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  )
}

function CentralCore() {
  const coreRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.5
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      coreRef.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={coreRef}>
      <icosahedronGeometry args={[0.5, 2]} />
      <meshStandardMaterial
        color="#00f0ff"
        emissive="#00f0ff"
        emissiveIntensity={0.5}
        metalness={0.9}
        roughness={0.1}
        wireframe
      />
    </mesh>
  )
}

interface SkillsGlobeProps {
  skills: string[]
}

export default function SkillsGlobe({ skills }: SkillsGlobeProps) {
  const skillPositions = useMemo(() => {
    return skills.map((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length)
      const theta = Math.sqrt(skills.length * Math.PI) * phi
      const radius = 2.5
      return {
        skill,
        position: [
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        ] as [number, number, number],
        color: i % 2 === 0 ? '#00f0ff' : '#ff00aa'
      }
    })
  }, [skills])

  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00aa" />
          
          <CentralCore />
          
          <OrbitRing radius={1.5} color="#00f0ff" speed={0.3} />
          <OrbitRing radius={2} color="#ff00aa" speed={-0.2} />
          <OrbitRing radius={2.5} color="#00f0ff" speed={0.1} />
          
          {skillPositions.map((item, i) => (
            <SkillNode
              key={i}
              position={item.position}
              skill={item.skill}
              color={item.color}
            />
          ))}
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

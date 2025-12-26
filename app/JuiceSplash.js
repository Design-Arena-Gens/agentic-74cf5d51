'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Droplet({ position, velocity, scale }) {
  const ref = useRef()
  const initialPos = useMemo(() => new THREE.Vector3(...position), [position])
  const vel = useMemo(() => new THREE.Vector3(...velocity), [velocity])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.y += vel.y * delta
      ref.current.position.x += vel.x * delta
      ref.current.position.z += vel.z * delta
      vel.y -= 9.8 * delta // gravity

      // Reset if below ground
      if (ref.current.position.y < -2) {
        ref.current.position.copy(initialPos)
        vel.set(...velocity)
      }
    }
  })

  return (
    <mesh ref={ref} position={position} castShadow>
      <sphereGeometry args={[0.08 * scale, 16, 16]} />
      <meshStandardMaterial
        color="#ff8c00"
        metalness={0.1}
        roughness={0.2}
        transparent
        opacity={0.9}
        envMapIntensity={1}
      />
    </mesh>
  )
}

function Splash({ position, size, rotation }) {
  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      <planeGeometry args={[size, size * 0.6]} />
      <meshStandardMaterial
        color="#ff8c00"
        metalness={0.2}
        roughness={0.3}
        transparent
        opacity={0.7}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default function JuiceSplash() {
  const droplets = useMemo(() => {
    const drops = []
    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * Math.PI / 3
      const speed = 2 + Math.random() * 2
      drops.push({
        position: [-1 + Math.random() * 0.3, 0.5 + Math.random() * 0.5, Math.random() * 0.3],
        velocity: [
          Math.cos(angle) * speed,
          -Math.sin(angle) * speed * 0.5,
          (Math.random() - 0.5) * 0.5
        ],
        scale: 0.5 + Math.random() * 1.5
      })
    }
    return drops
  }, [])

  return (
    <group>
      {/* Ground Plane for Splashes */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* Main Juice Stream */}
      <mesh position={[-0.8, 0.3, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 1.5, 16]} />
        <meshStandardMaterial
          color="#ff8c00"
          metalness={0.1}
          roughness={0.2}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Droplets */}
      {droplets.map((drop, i) => (
        <Droplet key={i} {...drop} />
      ))}

      {/* Splash Effects on Ground */}
      <Splash position={[-1.5, -1.95, 0]} size={0.8} rotation={[-Math.PI / 2, 0, 0]} />
      <Splash position={[-2, -1.95, 0.3]} size={0.6} rotation={[-Math.PI / 2, 0, 0.3]} />
      <Splash position={[-1.2, -1.95, -0.4]} size={0.5} rotation={[-Math.PI / 2, 0, -0.2]} />
      <Splash position={[-2.5, -1.95, -0.2]} size={0.4} rotation={[-Math.PI / 2, 0, 0.5]} />
    </group>
  )
}

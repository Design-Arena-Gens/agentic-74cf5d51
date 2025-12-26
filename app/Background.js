'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingFruit({ position, scale, color, type }) {
  const ref = useRef()
  const speed = useMemo(() => 0.5 + Math.random() * 0.5, [])
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + offset) * 0.3
      ref.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        metalness={0.2}
        roughness={0.4}
        transparent
        opacity={0.4}
      />
    </mesh>
  )
}

function Leaf({ position, rotation, scale }) {
  const ref = useRef()
  const speed = useMemo(() => 0.3 + Math.random() * 0.3, [])
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = rotation[2] + Math.sin(state.clock.elapsedTime * speed + offset) * 0.2
      ref.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * speed + offset) * 0.2
    }
  })

  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[0.3, 1, 0.05]} />
      <meshStandardMaterial
        color="#32cd32"
        metalness={0.1}
        roughness={0.5}
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function OrangeSlice({ position, rotation, scale }) {
  const ref = useRef()

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      <mesh>
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <meshStandardMaterial
          color="#ffa500"
          metalness={0.1}
          roughness={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.7, 0.7, 0.21, 32]} />
        <meshStandardMaterial
          color="#ffb347"
          metalness={0.1}
          roughness={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}

export default function Background() {
  const fruits = useMemo(() => [
    { position: [-4, 2, -3], scale: 0.8, color: '#ff8c00', type: 'orange' },
    { position: [4, 3, -4], scale: 0.6, color: '#ffa500', type: 'orange' },
    { position: [-3, -1, -3], scale: 0.7, color: '#ff8c00', type: 'orange' },
    { position: [3, 0, -4], scale: 0.5, color: '#ffa500', type: 'orange' },
    { position: [-5, 0, -5], scale: 0.9, color: '#ff8c00', type: 'orange' },
    { position: [5, -2, -4], scale: 0.6, color: '#ffa500', type: 'orange' },
  ], [])

  const leaves = useMemo(() => [
    { position: [-4.5, 3, -3], rotation: [0, 0, 0.3], scale: 1.2 },
    { position: [4.5, 2, -4], rotation: [0, 0, -0.3], scale: 1 },
    { position: [-3, 4, -3], rotation: [0, 0, 0.5], scale: 0.9 },
    { position: [3.5, 4, -4], rotation: [0, 0, -0.4], scale: 1.1 },
    { position: [-5, -3, -4], rotation: [0, 0, 0.2], scale: 1.3 },
    { position: [5, -3, -5], rotation: [0, 0, -0.5], scale: 1 },
    { position: [0, 5, -4], rotation: [0, 0, 0], scale: 1.4 },
    { position: [-2, -4, -3], rotation: [0, 0, 0.6], scale: 0.8 },
  ], [])

  const slices = useMemo(() => [
    { position: [-3.5, 1, -4], rotation: [Math.PI / 2, 0, 0.5], scale: 0.5 },
    { position: [3.8, -1, -5], rotation: [Math.PI / 2, 0, -0.3], scale: 0.6 },
    { position: [0, 4, -5], rotation: [Math.PI / 2, 0, 0], scale: 0.4 },
  ], [])

  return (
    <group>
      {/* Gradient Background Plane */}
      <mesh position={[0, 0, -6]} rotation={[0, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial>
          <primitive
            attach="map"
            object={(() => {
              const canvas = document.createElement('canvas')
              canvas.width = 512
              canvas.height = 512
              const ctx = canvas.getContext('2d')
              const gradient = ctx.createLinearGradient(0, 0, 0, 512)
              gradient.addColorStop(0, '#fff5e6')
              gradient.addColorStop(0.5, '#ffe6cc')
              gradient.addColorStop(1, '#ffd9b3')
              ctx.fillStyle = gradient
              ctx.fillRect(0, 0, 512, 512)
              return new THREE.CanvasTexture(canvas)
            })()}
          />
        </meshBasicMaterial>
      </mesh>

      {/* Floating Fruits */}
      {fruits.map((fruit, i) => (
        <FloatingFruit key={`fruit-${i}`} {...fruit} />
      ))}

      {/* Floating Leaves */}
      {leaves.map((leaf, i) => (
        <Leaf key={`leaf-${i}`} {...leaf} />
      ))}

      {/* Orange Slices */}
      {slices.map((slice, i) => (
        <OrangeSlice key={`slice-${i}`} {...slice} />
      ))}
    </group>
  )
}

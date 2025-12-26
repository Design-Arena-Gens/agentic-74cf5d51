'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Cylinder, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

export default function JuiceCan() {
  const canRef = useRef()
  const labelRef = useRef()

  useFrame((state) => {
    if (canRef.current) {
      canRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.3 + Math.PI / 2
    }
  })

  return (
    <group ref={canRef} position={[0, 1, 0]}>
      {/* Main Can Body */}
      <Cylinder args={[0.6, 0.6, 2.5, 32]} castShadow receiveShadow>
        <meshStandardMaterial
          color="#c0c0c0"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1.5}
        />
      </Cylinder>

      {/* Top Rim */}
      <Cylinder args={[0.62, 0.6, 0.1, 32]} position={[0, 1.28, 0]} castShadow>
        <meshStandardMaterial
          color="#888888"
          metalness={0.95}
          roughness={0.05}
        />
      </Cylinder>

      {/* Bottom Rim */}
      <Cylinder args={[0.6, 0.62, 0.1, 32]} position={[0, -1.28, 0]} castShadow>
        <meshStandardMaterial
          color="#888888"
          metalness={0.95}
          roughness={0.05}
        />
      </Cylinder>

      {/* Label Background - Orange gradient */}
      <Cylinder args={[0.61, 0.61, 1.8, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#ff8c00"
          metalness={0.3}
          roughness={0.4}
        />
      </Cylinder>

      {/* Brand Name "KISHORE" */}
      <Text
        position={[0, 0.4, 0.62]}
        rotation={[0, 0, 0]}
        fontSize={0.35}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/bold.woff"
        fontWeight={900}
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        KISHORE
      </Text>

      {/* Subtitle "FRESH JUICE" */}
      <Text
        position={[0, 0, 0.62]}
        rotation={[0, 0, 0]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight={700}
        letterSpacing={0.05}
      >
        FRESH ORANGE JUICE
      </Text>

      {/* "100% NATURAL" Badge */}
      <RoundedBox args={[0.8, 0.25, 0.02]} position={[0, -0.35, 0.62]} radius={0.05}>
        <meshStandardMaterial color="#228b22" metalness={0.3} roughness={0.5} />
      </RoundedBox>

      <Text
        position={[0, -0.35, 0.64]}
        fontSize={0.1}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight={800}
      >
        100% NATURAL
      </Text>

      {/* Orange Slice Illustration (simplified) */}
      <group position={[0, -0.75, 0.62]}>
        <mesh>
          <circleGeometry args={[0.25, 32]} />
          <meshStandardMaterial color="#ffa500" side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <circleGeometry args={[0.2, 32]} />
          <meshStandardMaterial color="#ffb347" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Leaf Decoration */}
      <group position={[0.3, 0.5, 0.62]} rotation={[0, 0, -0.3]}>
        <mesh>
          <boxGeometry args={[0.08, 0.2, 0.01]} />
          <meshStandardMaterial color="#228b22" />
        </mesh>
      </group>
      <group position={[-0.3, 0.5, 0.62]} rotation={[0, 0, 0.3]}>
        <mesh>
          <boxGeometry args={[0.08, 0.2, 0.01]} />
          <meshStandardMaterial color="#228b22" />
        </mesh>
      </group>

      {/* Pull Tab */}
      <group position={[0, 1.35, 0]}>
        <Cylinder args={[0.15, 0.15, 0.05, 32]}>
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </Cylinder>
        <mesh position={[0, 0.05, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.1, 0.03, 16, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </group>
  )
}

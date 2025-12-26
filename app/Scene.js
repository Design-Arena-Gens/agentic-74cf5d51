'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Float, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import JuiceCan from './JuiceCan'
import Background from './Background'
import JuiceSplash from './JuiceSplash'

export default function Scene() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#f0f0f0' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

        {/* Lighting Setup */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} />

        <Suspense fallback={null}>
          <Background />
          <Float
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.5}
          >
            <JuiceCan />
          </Float>
          <JuiceSplash />
          <Environment preset="studio" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}

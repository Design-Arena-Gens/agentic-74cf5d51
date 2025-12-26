'use client'

import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif'
    }}>
      Loading 3D Scene...
    </div>
  )
})

export default function Home() {
  return <Scene />
}

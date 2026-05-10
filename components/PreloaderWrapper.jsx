'use client'
import { useState, useEffect } from 'react'
import Preloader from './preloader'

const PreloaderLogo = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
    <img src="/assets/druvid-logo-monogram.webp" alt="Dhruvid" style={{ width: 56, height: 56, objectFit: 'contain' }} />
  </div>
)

export default function PreloaderWrapper({ children }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Preloader
      loading={loading}
      position="fixed"
      variant="stairs"
      bgColor="#09111f"
      duration={2200}
      loadingText="DHRUVID"
      logo={<PreloaderLogo />}
      textClassName="text-[#c9a84c] dark:text-[#c9a84c] tracking-[0.4em] [font-family:'Cinzel',serif] text-2xl"
      stairCount={10}
      stairsRevealFrom="left"
      stairsRevealDirection="up"
      zIndex={9999}
      className="min-h-screen"
    >
      {children}
    </Preloader>
  )
}

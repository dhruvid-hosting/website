'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFoundContent() {
  return (
    <div style={{ background: '#09111f', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', maxWidth: '480px' }}
      >
        <div style={{ fontSize: 'clamp(5rem, 15vw, 8rem)', fontFamily: "'Rosarivo', serif", fontWeight: 700, color: 'rgba(201,168,76,0.15)', lineHeight: 1, marginBottom: '1rem', letterSpacing: '-4px' }}>
          404
        </div>
        <h1 style={{ fontFamily: "'Rosarivo', serif", color: '#f0ece0', fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', marginBottom: '1rem' }}>
          Page Not Found
        </h1>
        <p style={{ color: '#8a8678', fontSize: '15px', lineHeight: 1.7, marginBottom: '2rem' }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{ padding: '0.75rem 1.5rem', background: '#c9a84c', borderRadius: '10px', color: '#09111f', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}
          >
            Back to Home
          </Link>
          <Link
            href="/hosting/"
            style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '10px', color: '#c9a84c', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}
          >
            View Plans
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

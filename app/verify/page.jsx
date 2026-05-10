'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

function VerifyContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  return (
    <div
      style={{
        background: '#09111f',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', maxWidth: '480px' }}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}
        >
          <CheckCircle
            size={56}
            strokeWidth={1.25}
            style={{ color: '#c9a84c' }}
          />
        </motion.div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Rosarivo', serif",
            color: '#f0ece0',
            fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
            marginBottom: '1rem',
            lineHeight: 1.25,
          }}
        >
          Email Verified
        </h1>

        {/* Message */}
        <p
          style={{
            color: '#8a8678',
            fontSize: '15px',
            lineHeight: 1.75,
            marginBottom: email ? '0.5rem' : '2rem',
          }}
        >
          Your email address has been verified. Your domain is now active.
        </p>

        {/* Show verified email if present in URL */}
        {email && (
          <p
            style={{
              color: 'rgba(201,168,76,0.7)',
              fontSize: '13px',
              marginBottom: '2rem',
              letterSpacing: '0.3px',
            }}
          >
            {decodeURIComponent(email)}
          </p>
        )}

        {/* CTA */}
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.75rem',
            background: '#c9a84c',
            borderRadius: '10px',
            color: '#09111f',
            fontWeight: 700,
            fontSize: '14px',
            textDecoration: 'none',
          }}
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            background: '#09111f',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      }
    >
      <VerifyContent />
    </Suspense>
  )
}

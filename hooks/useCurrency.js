import { useMemo } from 'react'

function detectIndia() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (tz === 'Asia/Calcutta' || tz === 'Asia/Kolkata') return true
    const lang = navigator.language || navigator.languages?.[0] || ''
    if (lang === 'hi' || lang.startsWith('hi-') || lang === 'en-IN') return true
  } catch {}
  return false
}

export default function useCurrency() {
  return useMemo(() => {
    const isIndia = detectIndia()
    return {
      currency: isIndia ? 'INR' : 'USD',
      symbol: isIndia ? '₹' : '$',
      isIndia,
    }
  }, [])
}

// Standalone helper for use outside components
export function getCurrency() {
  const isIndia = detectIndia()
  return { currency: isIndia ? 'INR' : 'USD', symbol: isIndia ? '₹' : '$', isIndia }
}

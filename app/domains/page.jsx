import { Suspense } from 'react'
import DomainsContent from '../../components/DomainsContent'

export const metadata = {
  title: 'Domain Search — Dhruvid',
  description: 'Search and register domain names — .com, .in, .co.in, .net, .io, and more. Instant availability check with live pricing.',
}

export default function Domains() {
  return <Suspense><DomainsContent /></Suspense>
}

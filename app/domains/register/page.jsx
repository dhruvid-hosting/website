import { Suspense } from 'react'
import DomainRegisterContent from '../../../components/DomainRegisterContent'

export const metadata = {
  title: 'Domain Registration — Dhruvid',
  description: 'Register your domain name with Dhruvid — fast, simple domain registration with full DNS management.',
}

export default function DomainRegister() {
  return <Suspense><DomainRegisterContent /></Suspense>
}

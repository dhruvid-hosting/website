import { Suspense } from 'react'
import ContactContent from '../../components/ContactContent'

export const metadata = {
  title: 'Contact Us — Dhruvid',
  description: 'Get in touch with Dhruvid support — hosting, domains, billing, or partnerships.',
}

export default function Contact() {
  return <Suspense><ContactContent /></Suspense>
}

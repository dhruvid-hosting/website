import { Suspense } from 'react'
import './globals.css'
import { ThemeProvider } from '../context/ThemeContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PreloaderWrapper from '../components/PreloaderWrapper'
import ScrollToHash from '../components/ScrollToHash'

export const metadata = {
  title: 'Dhruvid — Web Hosting & Domain Registration',
  description: 'Professional web hosting, domain registration, and managed services.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <PreloaderWrapper>
            <Suspense><ScrollToHash /></Suspense>
            <Navbar />
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
          </PreloaderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}

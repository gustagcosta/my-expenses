import React from 'react'
import { AppProps } from 'next/app'

import '../styles/index.css'
import { AuthProvider } from '../contexts/AuthContext'

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SafeHydrate>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SafeHydrate>
  )
}

export default MyApp

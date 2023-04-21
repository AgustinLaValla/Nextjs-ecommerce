import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'

export default function App({ Component, pageProps: { sesion, ...props } }: AppProps) {
  return (
    <SessionProvider session={sesion}>
      <Component {...props} />
    </SessionProvider>
  )
}

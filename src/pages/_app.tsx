import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { ThemeProvider } from '@mui/material';
import { lightTheme } from '@/presentation/themes';
import '@/styles/globals.css';
import { AuthProvider } from '@/presentation/context';

export default function App({ Component, pageProps: { sesion, ...props } }: AppProps) {
  return (
    <SessionProvider session={sesion}>
      <SWRConfig
        value={{
          fetcher: (resouce, init) => fetch(resouce, init).then(resp => resp.json())
        }}>
        <AuthProvider>
          <ThemeProvider theme={lightTheme}>
            <Component {...props} />
          </ThemeProvider>

        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  )
}

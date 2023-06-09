import React from 'react'
import Head from 'next/head';
import { Navbar } from '@/presentation/ui/Navbar';

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: JSX.Element | JSX.Element[];
}

export const ShopsLayout: React.FC<Props> = ({ title, pageDescription, imageFullUrl, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />

        {
          imageFullUrl && <meta name="og:image" content={imageFullUrl} />
        }
      </Head>

      <nav>
        <Navbar />
      </nav>


      <main style={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0px 30px'
      }}>
        {children}
      </main>
    </>
  )
}

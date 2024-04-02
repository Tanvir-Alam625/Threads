/**
 * @name Auth Layout
 * @description This is the layout for the authentication pages
 * @module app/%28auth%29/layout
 * @type layout
 * @path app/%28auth%29/layout.tsx
 * @project videon
*/
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import React from 'react'
import Image from 'next/image'
import '../globals.css'
import BgImg from '../../public/assets/bg/bg-img.jpg'
export const metadata = {
  title: "Threads",
  manifest: '/manifest.json'
}

type Props = {
  children: React.ReactNode
}

const inter = Inter({ subsets: ["latin"] })
const authLayout = ({ children }: Props) => {

  return (
    <ClerkProvider>
      <html lang='en'>
        <body suppressHydrationWarning={true}
          className={` bg-slate-900 ${inter.className}`}
        >
          <Image src={BgImg} loading='lazy' className='w-full grayscale-0 opacity-25 h-full object-cover fixed top-0 left-0 right-0 bottom-0' alt='bg' />
          <div className='flex flex-col items-center justify-center min-h-screen min-w-full '>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default authLayout
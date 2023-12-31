import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import React from 'react'
import '../globals.css'
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
                <body suppressHydrationWarning={true} className={`${inter.className} bg-dark-1`}>
                    <div className='flex flex-col items-center justify-center min-h-screen min-w-full'>
                        {children}
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}

export default authLayout
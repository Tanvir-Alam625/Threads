import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import React from 'react'
import '../globals.css'
export const metadata = {
    title: "Threads",
    description: "NextJs Thread Application"
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
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}

export default authLayout
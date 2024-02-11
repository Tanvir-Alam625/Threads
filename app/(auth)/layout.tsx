import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import React from 'react'
import '../globals.css'
import BgImg1 from "../../public/assets/bg/bg1.jpg"
import BgImg2 from "../../public/assets/bg/bg2.jpg"
import BgImg3 from "../../public/assets/bg/bg3.jpg"
import BgImg4 from "../../public/assets/bg/bg4.jpg"
import BgImg5 from "../../public/assets/bg/bg5.jpg"
import BgImg6 from "../../public/assets/bg/bg6.jpg"
export const metadata = {
    title: "Threads",
    manifest: '/manifest.json'
}

type Props = {
    children: React.ReactNode
}

const bgImages = [BgImg1, BgImg2, BgImg3, BgImg4, BgImg5, BgImg6]

const getRandomBgImage = () => {
    return bgImages[Math.floor(Math.random() * bgImages.length)]
}
const inter = Inter({ subsets: ["latin"] })
const authLayout = ({ children }: Props) => {
    let bgImage = getRandomBgImage()
    const interval = setInterval(() => {
        bgImage = getRandomBgImage()
    }, 10000)
    clearInterval(interval);

    return (
        <ClerkProvider>
            <html lang='en'>
                <body suppressHydrationWarning={true} className={`${inter.className} bg-fixed bg-cover bg-no-repeat bg-center `}
                    style={{ backgroundImage: `url(${bgImage.src})` }}
                >
                    <div className='flex flex-col items-center justify-center min-h-screen min-w-full '>
                        {children}
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}

export default authLayout
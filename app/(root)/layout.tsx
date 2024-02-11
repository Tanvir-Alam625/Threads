import { ClerkProvider } from '@clerk/nextjs/app-beta'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TopBar from '@/components/shared/TopBar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import BottomBar from '@/components/shared/BottomBar'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import { Toaster } from "react-hot-toast";
import { dark } from '@clerk/themes';
import BgImg1 from "../../public/assets/bg/bg1.jpg"
import BgImg2 from "../../public/assets/bg/bg2.jpg"
import BgImg3 from "../../public/assets/bg/bg3.jpg"
import BgImg4 from "../../public/assets/bg/bg4.jpg"
import BgImg5 from "../../public/assets/bg/bg5.jpg"
import BgImg6 from "../../public/assets/bg/bg6.jpg"

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Threads',
  manifest: '/manifest.json'
}

const bgImages = [BgImg1, BgImg2, BgImg3, BgImg4, BgImg5, BgImg6]

const getRandomBgImage = () => {
  return bgImages[Math.floor(Math.random() * bgImages.length)]
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  if (!user) {
    redirect("/sign-in");
    return null;
  }
  let bgImage = getRandomBgImage()
  const interval = setInterval(() => {
    bgImage = getRandomBgImage()
  }, 10000)
  clearInterval(interval);
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body
          suppressHydrationWarning={true}
          style={{
            backgroundImage: `url(${bgImage.src})`,
          }}
          className={`bg-fixed bg-cover bg-no-repeat bg-center ${inter.className}`}>
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "!bg-dark-1 !shadow shadow-light-1 !text-light-5 !border-light-1 !text-small-regular",
            }}
          />
          <TopBar />
          <main className={`flex flex-row`}>
            <LeftSidebar />
            <section className='main-container'>
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>
            <RightSidebar />
          </main>
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  )
}

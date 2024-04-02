/**
 * @name Root Layout
 * @description This is the root layout of the application
 * @module app/%28root%29/layout
 * @type layout
 * @path app/%28root%29/layout.tsx
 * @project videon
*/
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
import BgImg from "../../public/assets/bg/bg-img.jpg";
import Image from 'next/image'
import Downloader from '@/components/shared/Downloader'
import { getUser } from '@/lib/actions/user.actions'

const inter = Inter({ subsets: ['latin'] })

export interface UserData {
  image: string
  name: string
  _id: string
}


export const metadata: Metadata = {
  title: 'Threads',
  manifest: '/manifest.json'
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
  const userinfo = await getUser(user.id)
  if (!userinfo) {
    redirect("/onboarding");
    return null;
  }
  const userData: UserData = {
    image: userinfo.image,
    name: userinfo.name,
    _id: userinfo._id
  }
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body
          suppressHydrationWarning={true}
          className={` bg-slate-900 ${inter.className}`}>
          <Image src={BgImg} loading='lazy' className='w-full -z-30  opacity-25 h-full object-cover fixed top-0 left-0 right-0 bottom-0' alt='bg' />
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "!bg-slate-800/70 backdrop-blur-3xl !shadow shadow-light-1 !text-light-5 border !border-slate-600/40 !text-small-regular",
            }}
          />
          <main className={`flex flex-row max-w-[100rem] mx-auto`}>
            <LeftSidebar />
            <Downloader />
            <section className='main-container z-20'>
              <div className="w-full">
                <TopBar userData={userData} />
                <div className='mt-6 '>
                  {children}
                </div>
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

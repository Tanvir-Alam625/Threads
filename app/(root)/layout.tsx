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
const inter = Inter({ subsets: ['latin'] })


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
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body suppressHydrationWarning={true} className={`main ${inter.className}`}>
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

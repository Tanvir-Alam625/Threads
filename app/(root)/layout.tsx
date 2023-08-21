import { ClerkProvider } from '@clerk/nextjs/app-beta'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TopBar from '@/components/shared/TopBar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import BottomBar from '@/components/shared/BottomBar'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Threads',
  description: 'NextJs Threads Application',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  if (!user) {
    redirect("/sign-in");
    return;
  }
  return (
    <ClerkProvider>
      <html lang="en">
        <body suppressHydrationWarning={true} className={inter.className}>
          <TopBar />
          <main className='flex flex-row'>
            <LeftSidebar />
            <section className='main-container'>
              <div className="w-full mx-w-4xl">
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

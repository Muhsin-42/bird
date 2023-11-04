import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import NavBar from '@/components/shared/NavBar'
import LeftSideBar from '@/components/shared/LeftSideBar'
import RightSideBar from '@/components/shared/RightSideBar'
import Footer from '@/components/shared/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bird',
  description: 'NextJs 14 Social Media App.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavBar />

          <main>
            <LeftSideBar/>
              <section className='main-container'>
                <div className='w-full max-w-4xl'>
                {children}
                </div>
              </section>
            <RightSideBar />
          </main>

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { FetchingArea } from '../components/Fetchers/fetching-area/fetching-area'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Personal Finance App',
  description: 'A personal finance app created to keep my tabs in order',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className='flex'>
      <div className=' hidden md:flex flex-col w-11/12 border'>
        <FetchingArea></FetchingArea>

      </div>
        {children}
      </div>
        </body>
    </html>
  )
}

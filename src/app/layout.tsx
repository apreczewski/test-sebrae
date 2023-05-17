'use client';

import '../styles/globals.css'
import { Inter } from 'next/font/google'
import { Navbard } from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbard />
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  )
}

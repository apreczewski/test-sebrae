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
        {children}
      </body>
    </html>
  )
}

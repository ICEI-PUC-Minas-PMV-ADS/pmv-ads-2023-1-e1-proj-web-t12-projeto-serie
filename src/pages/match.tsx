import BottomNav from '@/components/bottomNav'
import TopNav from '@/components/topNav'
import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function match() {
  return (
    <>
    <TopNav />
    <main className="flex min-h-screen flex-col items-center pr-28 pl-28">
      <h1 className={`${inter.className}`}>match</h1>
    </main>
    <BottomNav />
  </>
  )
}

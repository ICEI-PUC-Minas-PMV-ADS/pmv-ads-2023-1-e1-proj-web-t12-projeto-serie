import Image from 'next/image'
import { Inter } from 'next/font/google'
import TopNav from '@/components/topNav'
import BottomNav from '@/components/bottomNav'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <TopNav/>
      <h1 className={`${inter.className}`}>home page</h1>
      <BottomNav/>
    </main>
  )
}

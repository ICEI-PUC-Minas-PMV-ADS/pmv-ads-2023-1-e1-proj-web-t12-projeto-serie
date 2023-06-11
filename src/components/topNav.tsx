import React, { useContext } from 'react'
import Image from 'next/image'
import SearchBar from './searchBar'
import whiteLogo from "../assets/logoWhite.png"
import darkLogo from "../assets/logoDark.png"
import Link from 'next/link'
import { LocalStorageContext } from '@/hooks/useLocalStorage'
import Filter from './filter'

export default function TopNav() {
  return (
    <nav className='flex flex-col sticky z-50 top-0 flex-col md:flex-row items-center md:justify-between w-full gap-4 p-5 md:pr-20 md:pl-20 dark:bg-zinc-900 bg-gray-300'>
      <div className='sm:hidden xl:inline'>
        <Link href={"/"}>
       <Image
        width={270}
        height={40}
        alt='Logo'
        src={whiteLogo} className='w-full h-auto rounded-xl dark:hidden' />
        <Image
        width={270}
        height={40}
        alt='Logo'
        src={darkLogo} className='w-full h-auto rounded-xl hidden dark:flex' />
        </Link>
      </div>

      <div className="links gap-8 hidden md:flex">
        <Link className='border-b-sky-500 border-b-2 hover:text-blue-400' href={"/"}>
        <p>Inicio</p>
        </Link>
        <Link className='border-b-sky-500 border-b-2 hover:text-blue-400' href={"/match"}>
        <p>Match</p>
        </Link>
        <Link className='border-b-sky-500 hover:text-blue-400 border-b-2' href={"/surprise"}>
        <p>Surpresa</p>
        </Link>
      </div>

      <SearchBar/>
    </nav>
  )
}

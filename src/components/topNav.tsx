import { LocalStorageContext } from '@/hooks/useLocalStorage'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'

import darkLogo from "../assets/logoDark.png"
import whiteLogo from "../assets/logoWhite.png"
import Filter from './filter'
import SearchBar from './searchBar'

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
      </div>

      <SearchBar/>
    </nav>
  )
}

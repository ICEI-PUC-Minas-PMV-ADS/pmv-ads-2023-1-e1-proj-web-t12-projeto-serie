import React from 'react'
import SearchBar from './searchBar'

export default function TopNav() {
  return (
    <nav className='flex items-center justify-center  w-full gap-4 p-5 pr-20 pl-20 bg-slate-950'>
      {/* <div className='sm:hidden xl:inline'>
        icone
      </div> */}

      <SearchBar/>
    </nav>
  )
}

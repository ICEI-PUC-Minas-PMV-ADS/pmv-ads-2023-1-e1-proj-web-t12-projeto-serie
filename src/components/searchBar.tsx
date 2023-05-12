import { Funnel } from '@phosphor-icons/react'
import React, { useState } from 'react'
import Dropdown from './dropdown';

export default function SearchBar() {
    const handleOptionChange = (option: any) => {
        console.log(option);
    };

    function handleSearch(e: React.FormEvent<HTMLFormElement>){
        // e.preventDefault() 
        console.log("alo")
    }

    const options = [
        { title: 'Gênero', icon: 'ph ph-funnel' },
        { title: 'Séries', icon: 'ph ph-funnel' },
        { title: 'Celebridade', icon: 'ph ph-funnel' },
        { title: 'Ano', icon: 'ph ph-funnel' },
       ];
  return (
    <form onSubmit={handleSearch}>
    <div className="flex">
    <div className="flex flex-col">
    <Dropdown options={options} onChange={handleOptionChange} />
    </div>

        <div className="relative w-90">
            <input type="search" id="search-dropdown" className="block p-2.5 w-52 md:min-w-20 z-20 lg:w-96 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Filmes, Atores, Diretores..." required>
            </input>
            <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-red-600 rounded-r-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" stroke-linejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span className="sr-only">Search</span>
            </button>
        </div>
    </div>
</form>
  )
}

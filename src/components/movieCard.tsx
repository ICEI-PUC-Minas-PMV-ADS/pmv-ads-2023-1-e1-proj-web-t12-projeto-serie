import image from 'next/image'
import Image from 'next/image'
import React from 'react'

type movieCardType={
  image: string,
  rating?: string
  title: string
}

export default function Movie(props: movieCardType) {
  return (
    <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
      <Image
        width={250}
        height={375}
        className='w-full h-auto block'
        src={`https://image.tmdb.org/t/p/w500/${props.image}`} alt={''}      />
      <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
        <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
          {props.title}
        </p>
      </div>
    </div>
  )
}

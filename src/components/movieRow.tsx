import React, { useEffect, useState } from 'react';
import Movie from './movieCard';
import { CaretCircleLeft, CaretCircleRight, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { movieType } from '@/types/interfaces';


type RowType = {
  content: movieType[]
  rowID: number
  title: string
}

const MovieRow = (props: RowType) => {
  const { content, rowID, title } = props
  const [movies, setMovies] = useState(content);


  const slideLeft = () => {
    var slider = document.getElementById('slider' + rowID)!;
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById('slider' + rowID)!;
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <h2 id='title' className='text-white font-bold md:text-xl p-4 flex-wrap'>{title}</h2>
      <div className='relative flex-wrap items-center group'>
      <CaretCircleLeft color="#0a0a0a" weight="fill"
          onClick={slideLeft}
          className='bg-white left-3 md:left-5 rounded-full absolute opacity-50 hover:opacity-100 bottom-24 md:bottom-48 cursor-pointer z-10 group-hover:block'
          size={40}
        />
        <div
          id={'slider' + rowID}
          className='w-screen h-full whitespace-nowrap scroll-smooth scrollbar-hide relative overflow-x-hidden'
        >
          {movies.map((item, id) => (
            <Movie key={id} 
              image={item.poster_path}  
              title={item.title}
              movieId={item.id}
            />
          ))}
        </div>

          <CaretCircleRight color="#0a0a0a" weight="fill"
            onClick={slideRight}
            className='bg-white sm:right-36 right-5  rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer hover:scale-110 z-10 top-24 md:top-48 group-hover:block'
            size={40}
          />
      </div>
    </>
  );
};

export default MovieRow;
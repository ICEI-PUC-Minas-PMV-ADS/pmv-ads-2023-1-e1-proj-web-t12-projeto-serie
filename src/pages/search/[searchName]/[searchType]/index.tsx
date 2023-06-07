/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { movieType } from '@/types/interfaces';
import Link from 'next/link';
import TopNav from '@/components/topNav';
import BottomNav from '@/components/bottomNav';
import { useState } from 'react';
import { CircleNotch } from '@phosphor-icons/react';

type SearchResultsProps = {
    searchName: string;
    searchType: string;
    movieRes: movieResType
  };

  type movieResType = {
    results: movieType[]
  }

export default function Search({
  searchName,
  searchType,
  movieRes
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [result, setResult] = useState<movieResType>(movieRes);
  const [page, setPage] = useState(2);
  const [isLoading, setLoading] = useState(false)

  async function loadMore(){  
    setLoading(true)   
    let apiUrl = '';
    switch (searchType) {
      case 'serie':
        apiUrl = `https://api.themoviedb.org/3/search/tv`;
        break;
      case 'movie':
        apiUrl = `https://api.themoviedb.org/3/search/movie`;
        break;
      default:
        // Default URL if searchType is not recognized
        apiUrl = `https://api.example.com/default-search?query=${searchName}`;
        break;
    }
    let movieRes: movieResType

    setPage(page + 1)
    
    const res = await fetch(`${apiUrl}?query=${searchName}&include_adult=false&language=pt-BR&page=${page}`, {
      headers: {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMmQ2NGZjZjA1NjI5NzgwNzM0OWJiM2RjZWZhMzVhMSIsInN1YiI6IjYyZTgyNzgyNzY0Yjk5MDA1ZWUyZThmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.323QPLRuoldEWXTShjCzLbkZfzwosQ0NRX7TZA1F9o0",
          'accept': 'application/json'
      }
      })
    
     movieRes = await res.json()
     setResult((prevResult) => ({
      results: [...prevResult.results, ...movieRes.results],
    }));
    setLoading(false)   
    }
  return (
    <>
    <TopNav />
    <div className="pt-8">
      {searchType === "movie" ? 
      <h2 className='font-bold pb-4 pl-8'> Pesquisa por &quot;{searchName}&quot; em Filme:</h2>
       : null}
      {searchType === "serie" ? 
      <h2 className='font-bold pb-4 pl-8'> Pesquisa por &quot;{searchName}&quot; em Séries:</h2>
       : null}
      <div className='grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-8 gap-4 items-center p-12'>
        {result.results.map((movie: movieType, index) => (
          <Link className='' href={`/series/${movie.id}`} key={index}>
            <div className="flex flex-col">
              <img
                className=''
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
              <p>{movie.title}</p>
              <p>{movie.name}</p>
              <p className='w-20 bg-black h-w-20 flex justify-center items-center rounded-full border-green-700 border-4 absolute z-20'>
              {parseFloat((movie.vote_average * 10).toFixed(4)) } %
              </p>
            </div>
          </Link>
        ))}
        {result.results.length <= 0 ?
        <div className='flex justify-center items-center font-bold text-lg w-full'>
        <h2>Sua busca não encontrou nada :(</h2> 
        </div> : null}
      </div>
      <div className="load flex justify-center items-center pb-8">
      {result.results.length <= 0 ?
        null : <button onClick={loadMore} className='bg-slate-500 p-4 rounded-lg flex gap-4'>
          {isLoading ? 
          <>
          Carregando... <CircleNotch className='animate-spin' size={24} weight="fill" /> 
          </> : <p>Carregar mais</p>}
        </button>}
        
      </div>
    </div>
    <BottomNav />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<SearchResultsProps> = async (context) => {
    const { searchName, searchType } = context.query;

    let apiUrl = '';

    switch (searchType) {
      case 'serie':
        apiUrl = `https://api.themoviedb.org/3/search/tv`;
        break;
      case 'movie':
        apiUrl = `https://api.themoviedb.org/3/search/movie`;
        break;
      default:
        // Default URL if searchType is not recognized
        apiUrl = `https://api.example.com/default-search?query=${searchName}`;
        break;
    }
    let movieRes: movieResType
    
    const res = await fetch(`${apiUrl}?query=${searchName}&include_adult=false&language=pt-BR&page=1`, {
      headers: {
          'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
          'accept': 'application/json'
      }
      })
    
     movieRes = await res.json()


    return {
      props: {
        searchName: searchName as string,
        searchType: searchType as string,
        movieRes: movieRes
      },
    };
  };
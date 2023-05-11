import Image from 'next/image'
import { GetStaticPaths, InferGetStaticPropsType } from 'next'
import { Inter } from 'next/font/google'
import TopNav from '@/components/topNav'
import BottomNav from '@/components/bottomNav'
import { title } from 'process'
import MovieRow from '@/components/movieRow'
import { movieType } from '@/types/interfaces'

const inter = Inter({ subsets: ['latin'] })

type movieResType = {
  results: movieType[]
}
 
export default function Home({movieRes}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(movieRes);

  return (
    <main className='`${inter.className}`'>
      <TopNav />
      <div className="flex min-h-screen flex-col items-center pr-28 pl-28 sm:flex-wrap">
        {/* <h1 className={`${inter.className}`}>Popular hoje</h1> */}

        <div className='flex-wrap gap-4 '>
          <MovieRow key={1} content={movieRes.results} title="Populares" rowID={1} />
       
        </div>
      </div>
      <BottomNav />
    </main>
  )
}


export const getStaticProps = async () => {
  
  const res = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc', {
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMmQ2NGZjZjA1NjI5NzgwNzM0OWJiM2RjZWZhMzVhMSIsInN1YiI6IjYyZTgyNzgyNzY0Yjk5MDA1ZWUyZThmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.323QPLRuoldEWXTShjCzLbkZfzwosQ0NRX7TZA1F9o0',
        'accept': 'application/json'
    }
  });

  const movieRes: movieResType = await res.json()
 
   return{
     props:{
      movieRes,
      fallback: false
     }
   }
   
 }
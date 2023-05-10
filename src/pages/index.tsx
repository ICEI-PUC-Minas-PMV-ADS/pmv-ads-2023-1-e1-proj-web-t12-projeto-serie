import Image from 'next/image'
import { GetStaticPaths, InferGetStaticPropsType } from 'next'
import { Inter } from 'next/font/google'
import TopNav from '@/components/topNav'
import BottomNav from '@/components/bottomNav'
import { title } from 'process'

const inter = Inter({ subsets: ['latin'] })

type movieType = {
  title: string
  adult: boolean
  poster_path: string

}

type movieResType = {
  results: movieType[]
}
 
export default function Home({movieRes}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(movieRes);

  return (
    <main className='`${inter.className}`'>
      <TopNav />
      <div className="flex min-h-screen flex-col items-center pr-28 pl-28">
        <h1 className={`${inter.className}`}>Popular hoje</h1>

        <div className='flex gap-4'>
        {movieRes.results.map((movie: movieType, index) => (
          <div className='flex w-auto' key={index}>
            <p className='absolute top-60 w-24 text-xs hidden md:inline-flex'>{movie.title}</p>
            <Image className='object-fill h-250 w-250' width={200} height={250} alt={movie.title} src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
          </div>
        ))}
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
import Image from "next/image";
import { GetStaticPaths, InferGetStaticPropsType } from "next";
import { Inter } from "next/font/google";
import TopNav from "@/components/topNav";
import BottomNav from "@/components/bottomNav";
import { title } from "process";
import MovieRow from "@/components/movieRow";
import { movieType } from "@/types/interfaces";

const inter = Inter({ subsets: ["latin"] });

type movieResType = {
  results: movieType[]
}
 
export default function Home({moviePop, SeriesPop}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(SeriesPop);
  console.log(moviePop);

  return (
    <main className="`${inter.className}`">
      <TopNav />
      <div className="flex min-h-screen flex-col items-center 2xl:pr-40 2xl:pl-40 xl:pr-28 xl:pl-28 sm:flex-wrap">
        {/* <h1 className=''>Popular hoje</h1> */}

        <div className=''>
          <MovieRow key={1} content={moviePop.results} title="Filmes populares" rowID={1} />
          <MovieRow key={2} content={SeriesPop.results} title="As melhores séries" rowID={2} />
          <MovieRow key={3} content={moviePop.results} title="Populares" rowID={3} />
       
        </div>
      </div>
      <BottomNav />
    </main>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc", {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        accept: "application/json",
      },
  });
  const resSeriesPopular = await fetch('https://api.themoviedb.org/3/tv/top_rated?language=pt-BR&page=1', {
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMmQ2NGZjZjA1NjI5NzgwNzM0OWJiM2RjZWZhMzVhMSIsInN1YiI6IjYyZTgyNzgyNzY0Yjk5MDA1ZWUyZThmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.323QPLRuoldEWXTShjCzLbkZfzwosQ0NRX7TZA1F9o0',
        'accept': 'application/json'
    }
});

  const moviePop: movieResType = await res.json()
  const SeriesPop: movieResType = await resSeriesPopular.json()
 
   return{
     props:{
      moviePop,
      SeriesPop,
      fallback: false
     }
   }
   
 }

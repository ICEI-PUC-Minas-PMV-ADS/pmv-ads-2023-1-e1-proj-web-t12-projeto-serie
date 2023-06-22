import BottomNav from "@/components/bottomNav";
import Filter from "@/components/filter";
import MovieRow from "@/components/movieRow";
import TopNav from "@/components/topNav";
import { LocalStorageContext } from "@/hooks/useLocalStorage";
import { movieType } from "@/types/interfaces";
import { GetStaticPaths, InferGetStaticPropsType } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { title } from "process";
import { useContext } from "react";

const inter = Inter({ subsets: ["latin"] });

type movieResType = {
  results: movieType[];
};

export default function Home({
  moviePop,
  SeriesPop,
  listOfLanguages,
  koreanMovies,
  japaneseMovies,
  portugueseMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { handleOpenFilter, openFilter } = useContext(LocalStorageContext);

  return (
    <main className="`${inter.className}` transition ">
      <TopNav />

      {openFilter ? <Filter languages={listOfLanguages}></Filter> : null}

      <div className="flex min-h-screen flex-col items-center 2xl:pr-40 2xl:pl-40 xl:pr-28 xl:pl-28 sm:flex-wrap">
        {/* <h1 className=''>Popular hoje</h1> */}

        <div className="">
          <MovieRow
            key={1}
            content={portugueseMovies.results}
            title="Filmes em Português"
            rowID={1}
          />
          <MovieRow
            key={2}
            content={koreanMovies.results}
            title="Filmes em Coreano"
            rowID={2}
          />
          <MovieRow
            key={3}
            content={japaneseMovies.results}
            title="Filmes em Japonês"
            rowID={3}
          />
          <MovieRow
            key={4}
            content={moviePop.results}
            title="Filmes populares"
            rowID={4}
          />
          <MovieRow
            key={5}
            content={SeriesPop.results}
            title="As melhores séries"
            rowID={5}
          />
          <MovieRow
            key={6}
            content={moviePop.results}
            title="Populares"
            rowID={6}
          />
        </div>
      </div>
      <BottomNav />
    </main>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc",
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    }
  );
  const resSeriesPopular = await fetch(
    "https://api.themoviedb.org/3/tv/top_rated?language=pt-BR&page=1",
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    }
  );

  const listOfLanguages = await fetch(
    `https://api.themoviedb.org/3/configuration/languages`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    }
  ).then((response) => response.json());

  const koreanMovies = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_original_language=ko`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    }
  ).then((response) => response.json());

  const portugueseMovies = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_original_language=pt`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    }
  ).then((response) => response.json());

  const japaneseMovies = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_original_language=ja`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    }
  ).then((response) => response.json());

  const moviePop: movieResType = await res.json();
  const SeriesPop: movieResType = await resSeriesPopular.json();

  return {
    props: {
      moviePop,
      SeriesPop,
      fallback: false,
      listOfLanguages,
      koreanMovies,
      japaneseMovies,
      portugueseMovies,
    },
  };
};

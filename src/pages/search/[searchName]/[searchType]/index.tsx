/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { movieType } from "@/types/interfaces";
import Link from "next/link";
import TopNav from "@/components/topNav";
import BottomNav from "@/components/bottomNav";
import { useContext, useState } from "react";
import { CircleNotch } from "@phosphor-icons/react";
import Tooltip from "@/components/tolltip";
import { LocalStorageContext } from "@/hooks/useLocalStorage";
import Filter from "@/components/filter";

type SearchResultsProps = {
  searchName: string;
  searchType: string;
  movieRes: movieResType;
  combinedData: movieType[];
  listOfLanguages: any;
};

type movieResType = {
  results: movieType[];
};

export default function Search({
  searchName,
  searchType,
  movieRes,
  combinedData,
  listOfLanguages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { handleOpenFilter, openFilter, updateSelectedFilter } =
    useContext(LocalStorageContext);
  const [result, setResult] = useState<movieResType>(movieRes);
  const [resultAll, setResultAll] = useState<movieType[]>(combinedData);
  const [page, setPage] = useState(2);
  const [isLoading, setLoading] = useState(false);

  async function loadMore() {
    setLoading(true);
    let apiUrl = "";
    switch (searchType) {
      case "serie":
        apiUrl = `https://api.themoviedb.org/3/search/tv`;
        break;
      case "movie":
        apiUrl = `https://api.themoviedb.org/3/search/movie`;
        break;
      default:
        // Default URL if searchType is not recognized
        apiUrl = `https://api.themoviedb.org/3/search/movie`;
        break;
    }
    let movieRes: movieResType;

    setPage(page + 1);

    const res = await fetch(
      `${apiUrl}?query=${searchName}&include_adult=false&language=pt-BR&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          accept: "application/json",
        },
      }
    );

    movieRes = await res.json();
    setResult((prevResult) => ({
      results: [...prevResult.results, ...movieRes.results],
    }));

    if (searchType === "all") {
      const res1 = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${searchName}&include_adult=false&language=pt-BR&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
            accept: "application/json",
          },
        }
      );

      const res2 = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchName}&include_adult=false&language=pt-BR&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
            accept: "application/json",
          },
        }
      );

      const [data1, data2] = await Promise.all([res1, res2]).then((responses) =>
        Promise.all(responses.map((res) => res.json()))
      );

      const combinedData: movieType[] = [...data1.results, ...data2.results]; // Combine the arrays
      setResultAll([...resultAll, ...combinedData]);
    }

    setLoading(false);
  }
  return (
    <>
      <TopNav />
      {openFilter ? <Filter languages={listOfLanguages}></Filter> : null}
      <div className="pt-8">
        {/* Title */}
        {searchType === "movie" ? (
          <h2 className="font-bold pb-4 pl-8">
            {" "}
            Pesquisa por &quot;{searchName}&quot; em Filme:
          </h2>
        ) : null}
        {searchType === "serie" ? (
          <h2 className="font-bold pb-4 pl-8">
            {" "}
            Pesquisa por &quot;{searchName}&quot; em Séries:
          </h2>
        ) : null}
        {searchType === "all" ? (
          <h2 className="font-bold pb-4 pl-8">
            {" "}
            Pesquisa por &quot;{searchName}&quot; em Séries e Filmes:
          </h2>
        ) : null}
        {/* Cards */}
        {searchType === "all" ? (
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-8 gap-4 items-center p-12">
            {resultAll.map((movie: movieType, index) => (
              <Link
                className=""
                href={`/${
                  Math.floor((index % 40) / 20) === 0 ? "series" : "movie"
                }/${movie.id}`}
                key={index}
              >
                <div className="flex flex-col">
                  <img
                    className=""
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt=""
                  />
                  <p>{movie.title}</p>
                  <p>{movie.name}</p>
                  {/* {parseFloat((movie.vote_average * 10).toFixed(4)) >= 60 ?
               <div className='w-20 bg-black h-w-20 flex justify-center items-center rounded-full border-green-700 border-4 absolute z-20'>
               <Tooltip text="Nota">
               {parseFloat((movie.vote_average * 10).toFixed(4)) } %
               </Tooltip>
               </div>
               : 
               <div className='w-20 bg-black h-w-20 flex justify-center items-center rounded-full border-red-600 border-4 absolute z-20'>
               <Tooltip text="Nota">
               {parseFloat((movie.vote_average * 10).toFixed(4)) } %
               </Tooltip>
             </div>} */}
                </div>
              </Link>
            ))}
            {result.results.length <= 0 ? (
              <div className="flex justify-center items-center font-bold text-lg w-full">
                <h2>Sua busca não encontrou nada :(</h2>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-8 gap-4 items-center p-12">
            {result.results.map((movie: movieType, index) => (
              <Link
                className=""
                href={`/${index <= 10 ? "movie" : "serie"}/${movie.id}`}
                key={index}
              >
                <div className="flex flex-col">
                  <img
                    className=""
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt=""
                  />
                  <p>{movie.title}</p>
                  <p>{movie.name}</p>
                  {/* {parseFloat((movie.vote_average * 10).toFixed(4)) >= 60 ?
                <div className='w-20 bg-black h-w-20 flex justify-center items-center rounded-full border-green-700 border-4 absolute z-20'>
                <Tooltip text="Nota">
                {parseFloat((movie.vote_average * 10).toFixed(4)) } %
                </Tooltip>
                </div>
                : 
                <div className='w-20 bg-black h-w-20 flex justify-center items-center rounded-full border-red-600 border-4 absolute z-20'>
                <Tooltip text="Nota">
                {parseFloat((movie.vote_average * 10).toFixed(4)) } %
                </Tooltip>
              </div>} */}
                </div>
              </Link>
            ))}
            {result.results.length <= 0 ? (
              <div className="flex justify-center items-center font-bold text-lg w-full">
                <h2>Sua busca não encontrou nada :(</h2>
              </div>
            ) : null}
          </div>
        )}
        {/* Button de load */}
        <div className="load flex justify-center items-center pb-8">
          {result.results.length <= 0 ? null : (
            <button
              onClick={loadMore}
              className="bg-slate-500 p-4 rounded-lg flex gap-4"
            >
              {isLoading ? (
                <>
                  Carregando...{" "}
                  <CircleNotch
                    className="animate-spin"
                    size={24}
                    weight="fill"
                  />
                </>
              ) : (
                <p>Carregar mais</p>
              )}
            </button>
          )}
        </div>
      </div>
      <BottomNav />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  SearchResultsProps
> = async (context) => {
  const { searchName, searchType } = context.query;

  let apiUrl = "";

  switch (searchType) {
    case "serie":
      apiUrl = `https://api.themoviedb.org/3/search/tv`;
      break;
    case "movie":
      apiUrl = `https://api.themoviedb.org/3/search/movie`;
      break;
    case "all":
      apiUrl = `https://api.themoviedb.org/3/search/movie`;
      break;
  }
  let movieRes: movieResType;

  const res = await fetch(
    `${apiUrl}?query=${searchName}&include_adult=false&language=pt-BR&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    }
  );

  movieRes = await res.json();

  const listOfLanguages = await fetch(
    `https://api.themoviedb.org/3/configuration/languages`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    }
  ).then((response) => response.json());

  if (searchType === "all") {
    const res1 = await fetch(
      `https://api.themoviedb.org/3/search/tv?query=${searchName}&include_adult=false&language=pt-BR&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          accept: "application/json",
        },
      }
    );

    const res2 = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchName}&include_adult=false&language=pt-BR&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          accept: "application/json",
        },
      }
    );

    const [data1, data2] = await Promise.all([res1, res2]).then((responses) =>
      Promise.all(responses.map((res) => res.json()))
    );

    const combinedData: movieType[] = [...data1.results, ...data2.results]; // Combine the arrays

    return {
      props: {
        combinedData,
        searchName: searchName as string,
        searchType: searchType as string,
        movieRes: movieRes,
        fallback: false,
        listOfLanguages,
      },
    };
  }

  return {
    props: {
      searchName: searchName as string,
      searchType: searchType as string,
      movieRes: movieRes,
      fallback: false,
      listOfLanguages,
      combinedData: [], // Provide an empty array if searchType is not 'all'
    },
  };
};

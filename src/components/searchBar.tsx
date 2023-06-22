import { LocalStorageContext } from "@/hooks/useLocalStorage";
import { movieType } from "@/types/interfaces";
import { Funnel } from "@phosphor-icons/react";
import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

import Dropdown from "./dropdown";
import Filter from "./filter";

export default function SearchBar() {
  const { handleOpenFilter, openFilter, selectedFilter } =
    useContext(LocalStorageContext);
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [movieValue, setMovieValue] = useState([]);
  const [tvValue, setTvValue] = useState([]);

  const OpenFilter = () => {
    if (openFilter === false) {
      handleOpenFilter(true);
    } else {
      handleOpenFilter(false);
    }
  };

  const handleOptionChange = (option: any) => {};

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedFilter.movie === true && selectedFilter.serie === true) {
      router.push(`/search/${inputValue}/all`);
    } else if (selectedFilter.movie && !selectedFilter.serie) {
      router.push(`/search/${inputValue}/movie`);
    } else if (!selectedFilter.movie && selectedFilter.serie) {
      router.push(`/search/${inputValue}/serie`);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);

    // Call the fetch function here to update the content
    fetchData(value);
  };

  const fetchData = (searchTerm: string) => {
    // Perform your fetch request here, e.g., using the `fetch` API

    const language = selectedFilter.language;

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=pt-BR&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setMovieValue(
          language
            ? data.results.filter((e: any) => e.original_language == language)
            : data.results.slice(0, 5)
        );
        // Update the content in Next.js state
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch(
      `https://api.themoviedb.org/3/search/tv?query=${searchTerm}&include_adult=false&language=pt-BR&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Process the fetched data and update the content in Next.js
        setTvValue(
          language
            ? data.results.filter((e: any) => e.original_language == language)
            : data.results.slice(0, 5)
        );
        // Update the content in Next.js state or Redux store, etc.
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="flex">
        <div className="flex flex-col">
          <button
            type="button"
            data-dropdown-toggle="dropdown"
            className="flex-shrink-0 flex md:flex z-10 items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            onClick={OpenFilter}
          >
            <Funnel size={20} className="fill-black dark:fill-white" />
            {openFilter ? (
              <svg
                className="fill-current h-4 w-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 14l6-6H4z" />
              </svg>
            ) : (
              <svg
                className="fill-current h-4 w-4 ml-2 rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 14l6-6H4z" />
              </svg>
            )}
          </button>
        </div>

        <div className="relative w-90">
          <div className="">
            <input
              type="text"
              value={inputValue}
              className="block p-2.5 w-52 md:min-w-20 z-20 lg:w-96 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Filmes, Atores, Diretores..."
              required
              onChange={handleChange}
            />
            <div className="absolute z-50 bg-slate-500 w-full">
              {movieValue[0] ? <p>Filmes :</p> : null}
              {movieValue.map((movie: movieType, index) => (
                <Link key={index} href={`/movie/${movie.id}`}>
                  <div className="p-3 cursor-pointer flex gap-4 border-black border-b-2">
                    <img
                      className="w-10"
                      src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                      alt=""
                    />
                    <p>{movie.title}</p>
                  </div>
                </Link>
              ))}
              {tvValue[0] ? <p>Série:</p> : null}
              {tvValue.map((movie: movieType, index) => (
                <Link key={index} href={`/series/${movie.id}`}>
                  <div className="p-3 cursor-pointer flex gap-4 border-black border-b-2">
                    <img
                      className="w-10"
                      src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                      alt=""
                    />
                    <p>{movie.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-red-600 border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}

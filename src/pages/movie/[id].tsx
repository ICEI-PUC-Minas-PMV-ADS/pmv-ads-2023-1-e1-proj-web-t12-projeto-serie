/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import BottomNav from "@/components/bottomNav";
import TopNav from "@/components/topNav";
import useViewport from "@/hooks/useViewport.hook";
import { Star, TrendDown, TrendUp } from "@phosphor-icons/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export async function getServerSideProps(context: any) {
  const movieId = context.query.id;

  const movieRequest = fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    }
  );

  const watchProviderRequest = fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?language=pt-BR`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    }
  );

  const trailersRequest = fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=pt-BR`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    }
  );

  const responses = await Promise.all([
    movieRequest,
    watchProviderRequest,
    trailersRequest,
  ]);

  const movie = await responses[0].json();
  const providers = await responses[1].json();
  const trailers = await responses[2].json();

  return {
    props: {
      movieId,
      movie,
      providers,
      trailers,
    },
  };
}

export default function MoviePage({
  movieId,
  movie,
  providers,
  trailers,
}: any) {
  const mobileScreen = useViewport();
  const [score, setScore] = useState(0);

  useEffect(() => {
    setScore(Number(localStorage.getItem(`score-${movieId}`)) || 0);
  }, [movieId]);

  const vote = (score: number) => {
    localStorage.setItem(`score-${movieId}`, score.toString());
    setScore(score);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Head>
        <meta
          property="og:image"
          content={`https://pmv-ads-2023-1-e1-proj-web-t12-projeto-serie.vercel.app/api/og?title=${movie.title}&image=${movie.poster_path}`}
        />
         <meta name='description' content='A ficha dos seus personagens preferidos' />
          <meta property='og:title' content={movie.title} />
          <meta property='og:description' content={movie.overview} />
          <meta property='og:type' content='website' />
          <title>{movie.title}</title>
      </Head>
      <TopNav />
      {mobileScreen
        ? movie.success != false && (
            <div className="flex flex-col mt-10 gap-10 w-full">
              <div className="flex px-4 mx-auto">
                <img
                  className="h-[270px]"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="Pôster do filme"
                />

                <div className="flex flex-col gap-8 ml-4 w-full">
                  <span className="dark:text-white font-bold text-2xl flex items-center">
                    {movie.title}
                  </span>
                  <span className="text-orange-400 font-bold text-2xl flex items-center">
                    <Star weight="fill" className="mr-2" />
                    {Number(movie.vote_average).toFixed(2) + "/10"}
                  </span>

                  {Number(movie.popularity) > 1500 ? (
                    <span className="text-teal-600 font-bold text-2xl flex items-center">
                      <TrendUp weight="fill" className="mr-2" /> Bem popular
                    </span>
                  ) : (
                    <span className="text-red-600 font-bold text-2xl flex items-center">
                      <TrendDown weight="fill" className="mr-2" /> Pouco popular
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center text-xl">
                <span className="mr-2">Minha nota:</span>

                {[1, 2, 3, 4, 5].map((item) => (
                  <Star
                    className="mr-2"
                    weight={score >= item ? "fill" : "regular"}
                    onClick={() => vote(item)}
                  />
                ))}
              </div>

              <iframe
                className="mx-auto"
                width="300"
                height="168"
                src={`https://www.youtube.com/embed/${trailers.results?.[0]?.key}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>

              {Object.keys(providers.results?.BR || {}).length ? (
                <div className="ml-8">
                  <span className="dark:text-white font-bold text-2xl flex items-center">
                    Assista agora:
                  </span>

                  <div className="mt-8">
                    <span className="dark:text-white font-semibold text-lg">
                      Assinatura
                    </span>
                    <div className="flex gap-4 mt-4 flex-wrap">
                      {providers.results.BR.rent
                        ?.slice(0, 4)
                        .map((provider: any, index: number) => {
                          return (
                            <img
                              className="w-12"
                              src={`https://image.tmdb.org/t/p/w500/${provider.logo_path}`}
                              alt={provider.provider_name + " logo"}
                              key={"mobile-rent-provider-" + index}
                            />
                          );
                        })}
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="dark:text-white font-semibold text-lg">
                      Pago
                    </span>
                    <div className="flex gap-4 mt-4 flex-wrap">
                      {providers.results.BR.buy
                        ?.slice(0, 4)
                        .map((provider: any, index: number) => {
                          return (
                            <img
                              className="w-12"
                              src={`https://image.tmdb.org/t/p/w500/${provider.logo_path}`}
                              alt={provider.provider_name + " logo"}
                              key={"mobile-buy-provider-" + index}
                            />
                          );
                        })}
                    </div>
                  </div>
                </div>
              ) : (
                <span className="dark:text-white font-bold text-xl text-center px-4">
                  Esse filme está em cartaz ou não está disponível para
                  streaming no Brasil
                </span>
              )}

              <div className="text-justify px-10 pb-10 text-lg">
                <span className="font-bold">Sinopse: </span>
                {movie.overview}
              </div>
            </div>
          )
        : movie.success != false && (
            <div className="flex flex-col mx-auto my-auto py-10 gap-10 w-3/5">
              <div className="flex">
                <img
                  className="h-[350px]"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="Pôster do filme"
                />

                <div className="flex flex-col gap-8 ml-8 w-full">
                  <div className="flex gap-4">
                    <span className="dark:text-white font-bold text-2xl flex items-center">
                      {movie.title}
                    </span>
                    <span className="text-orange-400 font-bold flex items-center">
                      <Star weight="fill" className="mr-2" />
                      {Number(movie.vote_average).toFixed(2) + "/10"}
                    </span>

                    {Number(movie.popularity) > 1500 ? (
                      <span className="text-teal-600 font-bold flex items-center">
                        <TrendUp weight="fill" className="mr-2" /> Bem popular
                      </span>
                    ) : (
                      <span className="text-red-600 font-bold flex items-center">
                        <TrendDown weight="fill" className="mr-2" /> Pouco
                        popular
                      </span>
                    )}
                  </div>

                  <div className="flex items-center">
                    <span className="mr-2">Minha nota:</span>

                    {[1, 2, 3, 4, 5].map((item) => (
                      <Star
                        className="mr-2"
                        weight={score >= item ? "fill" : "regular"}
                        onClick={() => vote(item)}
                      />
                    ))}
                  </div>

                  <div className="flex w-full h-full">
                    <iframe
                      className="w-4/5"
                      src={`https://www.youtube.com/embed/${trailers.results?.[0]?.key}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>

                    {Object.keys(providers.results?.BR || {}).length ? (
                      <div className="ml-8">
                        <span className="dark:text-white font-bold text-2xl flex items-center">
                          Assista agora:
                        </span>

                        <div className="mt-8">
                          <span className="dark:text-white font-semibold text-lg">
                            Assinatura
                          </span>
                          <div className="flex gap-4 mt-4 flex-wrap">
                            {providers.results.BR.rent
                              ?.slice(0, 4)
                              .map((provider: any, index: number) => {
                                return (
                                  <img
                                    className="w-12"
                                    src={`https://image.tmdb.org/t/p/w500/${provider.logo_path}`}
                                    alt={provider.provider_name + " logo"}
                                    key={"desktop-rent-provider-" + index}
                                  />
                                );
                              })}
                          </div>
                        </div>

                        <div className="mt-4">
                          <span className="dark:text-white font-semibold text-lg">
                            Pago
                          </span>
                          <div className="flex gap-4 mt-4 flex-wrap">
                            {providers.results.BR.buy
                              ?.slice(0, 4)
                              .map((provider: any, index: number) => {
                                return (
                                  <img
                                    className="w-12"
                                    src={`https://image.tmdb.org/t/p/w500/${provider.logo_path}`}
                                    alt={provider.provider_name + " logo"}
                                    key={"desktop-buy-provider-" + index}
                                  />
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="ml-8 flex items-center w-1/3">
                        <span className="dark:text-white font-bold text-xl flex items-center">
                          Esse filme está em cartaz ou não está disponível para
                          streaming no Brasil
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-justify">
                  <span className="font-bold">Sinopse: </span>
                  {movie.overview}
                </div>
              </div>
            </div>
          )}
      <BottomNav />
    </main>
  );
}

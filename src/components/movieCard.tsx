import { Star } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type movieCardType = {
  image: string;
  rating: number;
  title: string;
  movieId: number;
  name: string;
  row: number;
};

let type = "";
export default function Movie(props: movieCardType) {
  if (props.row === 5) {
    type = "series";
  } else {
    type = "movie";
  }
  return (
    <Link
      href={`/${type}/${props.movieId}`}
      className="-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 hover:opacity-70"
    >
      <Image
        width={250}
        height={375}
        className="w-full h-auto block rounded-xl"
        src={`https://image.tmdb.org/t/p/w500/${props.image}`}
        alt={""}
      />
      <div className="w-full h-full pt-4">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {props.title}
        </p>
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {props.name}
        </p>
        <div className="flex items-center gap-2">
          <Star size={32} color="#FF8629" weight="fill" />
          <p className="text-orange-400 font-bold	">{props.rating}</p>
        </div>
      </div>
    </Link>
  );
}

import React, { useEffect, useState } from "react";
import Movie from "./movieCard";
import {
  CaretCircleLeft,
  CaretCircleRight,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { movieType } from "@/types/interfaces";

type RowType = {
  content: movieType[];
  rowID: number;
  title: string;
};

const MovieRow = (props: RowType) => {
  const { content, rowID, title } = props;
  const [movies, setMovies] = useState(content);

  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowID)!;
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider" + rowID)!;
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
      <div className="relative group w-screen lg:w-auto">
      <h2 id="title" className="font-bold md:text-xl p-4 flex-wrap">
        {title}
      </h2>
        <CaretCircleLeft
          color="#0a0a0a"
          weight="fill"
          onClick={slideLeft}
          className="bg-white top-0 left-0 bottom-0 mr-auto ml-4 my-auto rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block"
          size={40}
        />
        <div className="parent-container relative">
        <div
          id={"slider" + rowID}
          className="container scrollbar-hide whitespace-nowrap scroll-smooth scrollbar-hide relative overflow-x-hidden"
        >
          {movies.map((item, id) => (
            <Movie
              key={id}
              image={item.poster_path}
              title={item.title}
              movieId={item.id}
              rating={item.vote_average}
              name={item.name}
              row={rowID}
            />
          ))}
        </div>
        </div>

        <CaretCircleRight
          color="#0a0a0a"
          weight="fill"
          onClick={slideRight}
          className="bg-white top-0 right-0 bottom-0 ml-auto mr-4 my-auto rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer hover:scale-110 z-10 group-hover:block"
          size={40}
        />
      </div>
  );
};

export default MovieRow;

import React from "react";

type MovieProps = {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    _count?: {
      favorite_Movies: number;
    };
  };
};

const ResultMovieDetails = ({ movie }: MovieProps) => {
  return (
    <div>
      <li key={movie.id}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={400}
        />
        <h3>{movie.title}</h3>
        <p>公開日: {movie.release_date}</p>
        {movie._count?.favorite_Movies ? (
          <p>お気に入り登録者数: {movie._count?.favorite_Movies}</p>
        ) : (
          <></>
        )}
      </li>
    </div>
  );
};

export default ResultMovieDetails;

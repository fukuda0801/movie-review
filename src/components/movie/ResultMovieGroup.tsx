import styles from "@/styles/components/movie/ResultMovieGroup.module.css";
import ResultMovieDetails from "./ResultMovieDetails";

type MovieProps = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  _count: {
    favorite_Movies: number;
  };
};

type MovieDetailsProps = {
  movieDetails: MovieProps[];
};

const ResultMovieGroup = ({ movieDetails }: MovieDetailsProps) => {
  return (
    <div>
      <ul>
        {movieDetails.map((movie: MovieProps) => {
          return <ResultMovieDetails movie={movie} key={movie.id} />;
        })}
      </ul>
    </div>
  );
};

export default ResultMovieGroup;

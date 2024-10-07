import styles from "@/styles/components/movie/ResultMovieDetail.module.css";
import Link from "next/link";

type MovieProps = {
  movie: {
    id: number;
    api_id: number;
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
    <>
      <Link href={`/movie/${movie.api_id}`}>
        <li key={movie.id} className={styles.resultMovieDetail}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            width={160}
            height={215}
            className={styles.resultMovieDetailImg}
          />
          <div className={styles.resultMovieDetailInfo}>
            <h3>{movie.title}</h3>
            <p>
              <span>公開日:</span> {movie.release_date}
            </p>
            {movie._count?.favorite_Movies ? (
              <p>
                <span>お気に入り登録者数:</span> {movie._count?.favorite_Movies}
              </p>
            ) : (
              <></>
            )}
          </div>
        </li>
      </Link>
    </>
  );
};

export default ResultMovieDetails;

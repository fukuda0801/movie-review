import type { Genre, GenreList } from "@/types/movie";
import styles from "@/styles/components/movie/GenreMovie.module.css";

const GenreMovie = ({ genres }: GenreList) => {
  return (
    <div className={styles.genreMovieContent}>
      <h2>ジャンルから探す</h2>
      <div className={styles.genreMovieGroup}>
        {genres.genres.map((genre: Genre) => {
          return (
            <div key={genre.id} className={styles.genreArea}>
              <p>{genre.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GenreMovie;

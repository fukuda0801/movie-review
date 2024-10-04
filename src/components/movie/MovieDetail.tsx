import Image from "next/image";
import styles from "@/styles/components/movie/MovieDetail.module.css";

type MovieDetailProps = {
  movieDetail: {
    image: string;
    title: string;
    release_date: string;
    runtime: number;
    genres: { id: number; name: string }[];
    overview: string;
    homepage: string;
    firstTwoCast: any;
  };
};

const MovieDetail = ({ movieDetail }: MovieDetailProps) => {
  return (
    <div className={styles.movieDetail}>
      <div className={styles.movieDetailContent}>
        <Image
          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movieDetail.image}`}
          alt="映画ポスター"
          width={300}
          height={400}
          priority
          className={styles.movieDetailImg}
        />
        <div className={styles.movieDetailInfo}>
          <h2>{movieDetail.title}</h2>
          <p>
            <span>上映日：</span>
            {movieDetail.release_date} / <span>上映時間：</span>
            {movieDetail.runtime}分
          </p>
          <p>
            <span>ホームページ：</span>
            <a href={movieDetail.homepage}>こちら</a>から
          </p>
          <div className={styles.movieDetailGenres}>
            <span>ジャンル：</span>
            <ul>
              {movieDetail.genres.map((genre) => {
                return <li key={genre.id}>{genre.name}</li>;
              })}
            </ul>
          </div>
          <p className={styles.movieDetailOverview}>
            <span>あらすじ：</span>
            {movieDetail.overview}
          </p>
          <div>
            <span>キャスト：</span>
            <div className={styles.movieDetailCastGroup}>
              {movieDetail.firstTwoCast.map((cast: any) => {
                return (
                  <div key={cast.id} className={styles.movieDetailCast}>
                    <Image
                      src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${cast.profile_path}`}
                      alt="キャストの画像"
                      width={100}
                      height={150}
                    />
                    <p>{cast.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

import Head from "next/head";
import SearchForm from "@/components/movie/SearchForm";
import GenreMovie from "@/components/movie/GenreMovie";
import SliderMovies from "@/components/movie/SliderMovies";

export const getServerSideProps = async () => {
  // APIを通してDBより映画のジャンル一覧を取得
  const genreResponse = await fetch(`http://localhost:3000/api/movie/getGenreMovie`);
  const genres = await genreResponse.json();

  // APIを通してDBより人気映画を取得（6件のみ）
  const popularMovieResponse = await fetch(
    `http://localhost:3000/api/movie/getFavoriteMovie?limit=6`
  );
  const popularMovies = await popularMovieResponse.json();

  // APIを通してDBより上映中映画（としているもの）を取得(6件のみ)
  const playingMovieResponse = await fetch(
    `http://localhost:3000/api/movie/getPlayingMovie?limit=6`
  );
  const playingMovies = await playingMovieResponse.json();

  return {
    props: {
      genres,
      popularMovies,
      playingMovies,
    },
  };
};

const Home = ({ genres, popularMovies, playingMovies }: any) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="映画のレビューサイトです。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchForm title="フリーワードで探す" />
      <SliderMovies movies={popularMovies.popularMovies} title="人気の映画から探す" />
      <SliderMovies movies={playingMovies.playingMovies} title="上映中の映画から探す" />
      <GenreMovie genres={genres} />
    </>
  );
};

export default Home;

import MovieDetail from "@/components/movie/MovieDetail";
import SearchForm from "@/components/movie/SearchForm";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${params?.id}?api_key=586eeda24edab92c73392fb73d4d14ce&language=ja-JP`
  );
  const movieDetail = await movieResponse.json();
  const castResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${params?.id}/credits?api_key=586eeda24edab92c73392fb73d4d14ce&language=ja-JP`
  );
  const movieCast = await castResponse.json();
  const firstTwoCast = movieCast.cast.slice(0, 2);

  return {
    props: {
      movieDetail,
      firstTwoCast,
    },
  };
};

const Index = ({ movieDetail, firstTwoCast }: any) => {
  const movie = {
    image: movieDetail.poster_path,
    title: movieDetail.title,
    release_date: movieDetail.release_date,
    runtime: movieDetail.runtime,
    genres: movieDetail.genres,
    overview: movieDetail.overview,
    homepage: movieDetail.homepage,
    firstTwoCast,
  };

  return (
    <main>
      <SearchForm />
      <MovieDetail movieDetail={movie} />
    </main>
  );
};

export default Index;

import ResultMovieGroup from "@/components/movie/ResultMovieGroup";
import ResultPagination from "@/components/movie/ResultPagination";
import ResultTitle from "@/components/movie/ResultTitle";
import SearchForm from "@/components/movie/SearchForm";
import styles from "@/styles/pages/movie/playing/index.module.css";
import type { GetServerSideProps } from "next";

type PlayingMovie = {
  id: number;
  api_id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
};

type PlayingMovieProps = {
  movieDetails: PlayingMovie[];
  currentPage: number;
  totalPage: number;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = Number.parseInt(context.query.page as string, 10) || 1;

  const res = await fetch(`http://localhost:3000/api/movie/resultPlayingMovie?page=${page}`);
  const data = await res.json();

  return {
    props: {
      movieDetails: data.movieDetails,
      currentPage: data.currentPage,
      totalPage: data.totalPage,
    },
  };
};

const Index = ({ movieDetails, currentPage, totalPage }: PlayingMovieProps) => {
  return (
    <main className={styles.resultPlayingContent}>
      <ResultTitle title="上映中映画一覧" currentPage={currentPage} totalPage={totalPage} />
      <ResultMovieGroup movieDetails={movieDetails} />
      <ResultPagination currentPage={currentPage} totalPage={totalPage} url="playing" />
    </main>
  );
};

export default Index;

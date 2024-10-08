import ResultMovieGroup from "@/components/movie/ResultMovieGroup";
import ResultTitle from "@/components/movie/ResultTitle";
import type { SearchMoviesProps } from "@/types/movie";
import type { GetServerSideProps } from "next";
import styles from "@/styles/pages/movie/search/index.module.css";
import ResultPagination from "@/components/movie/ResultPagination";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const search = context.query.search;
  const page = Number(context.query.page as string) || 1;

  const response = await fetch(
    `http://localhost:3000/api/movie/getSearchMovie?search=${search}&page=${page}`
  );
  if (!response.ok) {
    return { notFound: true };
  }
  const data = await response.json();

  return {
    props: { movies: data.resultMovies, currentPage: data.currentPage, totalPage: data.totalPage },
  };
};

const Index = ({ movies, currentPage, totalPage }: SearchMoviesProps) => {
  return (
    <main className={styles.searchResultContent}>
      <ResultTitle title="フリーワード検索結果" currentPage={currentPage} totalPage={totalPage} />
      <ResultMovieGroup movieDetails={movies} />
      <ResultPagination currentPage={currentPage} totalPage={totalPage} url="search" />
    </main>
  );
};

export default Index;

import ResultMovieGroup from "@/components/movie/ResultMovieGroup";
import ResultPagination from "@/components/movie/ResultPagination";
import ResultTitle from "@/components/movie/ResultTitle";
import { GetServerSideProps } from "next";

type FavoriteMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  _count: {
    favorite_Movies: number;
  };
};

type FavoriteMovieProps = {
  movieDetails: FavoriteMovie[];
  currentPage: number;
  totalPage: number;
};

// SSRでAPIルートからお気に入り映画の情報を取得
export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt(context.query.page as string, 10) || 1;

  const res = await fetch(`http://localhost:3000/api/movie/resultFavoriteMovie?page=${page}`);
  const data = await res.json();

  return {
    props: {
      movieDetails: data.movieDetails,
      currentPage: data.currentPage || 1,
      totalPage: data.totalPage || 1,
    },
  };
};

const Index = ({ movieDetails, currentPage, totalPage }: FavoriteMovieProps) => {
  return (
    <main>
      <ResultTitle title="お気に入り映画一覧" currentPage={currentPage} totalPage={totalPage} />
      <ResultMovieGroup movieDetails={movieDetails} />
      <ResultPagination currentPage={currentPage} totalPage={totalPage} url="favorite" />
    </main>
  );
};

export default Index;

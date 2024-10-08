// ジャンル検索
export type Genre = {
  id: number;
  name: string;
  api_id: number;
};

export type GenreList = {
  genres: {
    genres: Genre[];
  };
};

// あいまい検索
export type SearchFormProps = {
  title?: string;
};

// あいまい検索結果
type SearchMovieProps = {
  id: number;
  api_id: number;
  playing: boolean;
  title: string;
  release_date: string;
  poster_path: string;
};

export type SearchMoviesProps = {
  movies: SearchMovieProps[];
  totalPage: number;
  currentPage: number;
};

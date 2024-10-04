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

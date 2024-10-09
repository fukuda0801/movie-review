import { render, screen } from "@testing-library/react";
import GenreMovie from "./GenreMovie";

describe("GenreMovieコンポーネント", () => {
  const mockGenres = {
    genres: [
      { id: 1, name: "アクション", api_id: 1 },
      { id: 2, name: "ドラマ", api_id: 2 },
      { id: 3, name: "コメディ", api_id: 3 },
    ],
  };

  const emptyGenres = {
    genres: [],
  };

  test("コンポーネントが正しくレンダリングされること", () => {
    render(<GenreMovie genres={mockGenres} />);
    expect(screen.getByText("ジャンルから探す")).toBeInTheDocument();

    mockGenres.genres.map((genre) => {
      expect(screen.getByText(genre.name)).toBeInTheDocument();
    });
  });

  test("ジャンルが存在しない場合、ジャンルリストが表示されないこと", () => {
    render(<GenreMovie genres={emptyGenres} />);
    expect(screen.getByText("ジャンルから探す")).toBeInTheDocument();

    const genreItems = screen.getAllByText(/.+/);
    expect(genreItems.length).toBe(1);
  });
});

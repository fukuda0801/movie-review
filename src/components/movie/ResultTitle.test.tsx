import { render, screen } from "@testing-library/react";
import ResultTitle from "./ResultTitle";

describe("ResultTitleコンポーネント", () => {
  test("タイトルとページ数が正しく表示されていること", () => {
    render(<ResultTitle title="結果タイトル" currentPage={1} totalPage={10} />);
    expect(screen.getByText("結果タイトル")).toBeInTheDocument();
    expect(screen.getByText("1 / 10 ページ")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import ResultPagination from "./ResultPagination";

describe("ResultPaginationコンポーネント", () => {
  test("最初、現在、現在＋１、現在ー１、最後のページが表示されていること", () => {
    render(<ResultPagination currentPage={5} totalPage={10} url="playing" />);
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.queryByText("3")).not.toBeInTheDocument();
    expect(screen.queryByText("8")).not.toBeInTheDocument();
  });

  test("...省略がページが表示されること", () => {
    render(<ResultPagination currentPage={5} totalPage={10} url="playing" />);
    const omissionArray = screen.getAllByText("...");
    expect(omissionArray.length).toBe(2);
  });

  test("現在のページが2以下の時に1と2のみ表示されていること", () => {
    render(<ResultPagination currentPage={1} totalPage={2} url="playing" />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.queryByText("...")).not.toBeInTheDocument();
  });
});

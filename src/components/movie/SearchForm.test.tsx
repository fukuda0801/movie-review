import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import SearchForm from "./SearchForm";

// next/routerモジュールをモック
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("SearchForm コンポーネント", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    // 各テスト前にモックをリセット
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test("提供されたタイトルでコンポーネントがレンダリングされること", () => {
    const title = "映画検索";
    render(<SearchForm title={title} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test("ユーザーが入力するとinputの値が更新されること", () => {
    render(<SearchForm title="映画検索" />);

    const inputElement = screen.getByPlaceholderText("映画検索") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "インセプション" } });

    expect(inputElement.value).toBe("インセプション");
  });

  test("フォーム送信時に正しいURLでrouter.pushが呼び出される", () => {
    render(<SearchForm title="映画検索" />);

    const inputElement = screen.getByPlaceholderText("映画検索") as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: /検索/i });

    fireEvent.change(inputElement, { target: { value: "インセプション" } });
    fireEvent.click(submitButton);

    expect(mockPush).toHaveBeenCalledWith("/movie/search?search=インセプション");
  });

  test("検索入力が空または空白のみの場合、router.pushは呼び出されない", () => {
    render(<SearchForm title="映画検索" />);

    const submitButton = screen.getByRole("button", { name: /検索/i });

    fireEvent.click(submitButton);
    expect(mockPush).not.toHaveBeenCalled();

    const inputElement = screen.getByPlaceholderText("映画検索") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "   " } });
    fireEvent.click(submitButton);
    expect(mockPush).not.toHaveBeenCalled();
  });
});

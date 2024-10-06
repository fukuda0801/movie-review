import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
}

const ResultPagination = ({ currentPage, totalPage }: PaginationProps) => {
  // ページ番号を配列に格納
  const pageNumbers = [];

  // 一度に表示するページ番号の最大数を設定
  const MAX_PAGE_NUMBER = 5;

  // 現在のページを中心に、前後にどのくらいのページ番号を表示するか設定
  const delta = Math.floor(MAX_PAGE_NUMBER / 2);

  // 最初のページ
  if (currentPage - delta > 1) {
    pageNumbers.push(1);
  }

  // 省略表示
  if (currentPage - delta > 2) {
    pageNumbers.push("...");
  }

  // 現在ページの前後ページ番号
  for (
    let i = Math.max(1, currentPage - delta);
    i <= Math.min(totalPage, currentPage + delta);
    i++
  ) {
    pageNumbers.push(i);
  }

  // 省略表示
  if (currentPage + delta < totalPage - 1) {
    pageNumbers.push("...");
  }

  // 最後のページ
  if (currentPage + delta < totalPage) {
    pageNumbers.push(totalPage);
  }

  return (
    <div>
      <ul>
        {pageNumbers.map((page, index) => (
          <li key={index}>
            {typeof page === "number" ? (
              <Link href={`/movie/favorite?page=${page}`}>
                <p>{page}</p>
              </Link>
            ) : (
              <span>{page}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultPagination;

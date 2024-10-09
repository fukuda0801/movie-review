import Link from "next/link";
import styles from "@/styles/components/movie/ResultPaging.module.css";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  url: string;
}

const ResultPagination = ({ currentPage, totalPage, url }: PaginationProps) => {
  const pageNumbers = [];

  // 最初のページ
  pageNumbers.push(1);

  // 必要であれば「...」を追加（最初のページと、現在のページの-1が離れている場合）
  if (currentPage > 3) {
    pageNumbers.push("...");
  }

  // 現在ページの前後1ページを表示
  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPage - 1, currentPage + 1); i++) {
    pageNumbers.push(i);
  }

  // 必要であれば「...」を追加（現在のページ+1と最後のページが離れている場合）
  if (currentPage < totalPage - 2) {
    pageNumbers.push("...");
  }

  // 最後のページ
  if (totalPage > 1) {
    pageNumbers.push(totalPage);
  }

  return (
    <div className={styles.paginationGroup}>
      <ul>
        {pageNumbers.map((page, index) => (
          <li key={index}>
            {typeof page === "number" ? (
              <Link href={`/movie/${url}?page=${page}`}>
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

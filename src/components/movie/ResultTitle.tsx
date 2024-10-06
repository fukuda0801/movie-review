import styles from "@/styles/components/movie/ResultTitle.module.css";

type ResultTitleProps = {
  title: string;
  currentPage: number;
  totalPage: number;
};

const ResultTitle = ({ title, currentPage, totalPage }: ResultTitleProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <h2>
        {currentPage} / {totalPage} ページ
      </h2>
    </div>
  );
};

export default ResultTitle;

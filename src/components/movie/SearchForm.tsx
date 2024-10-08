import styles from "@/styles/pages/movie/[id]/index.module.css";
import Button from "../utils/Button";
import { SearchFormProps } from "@/types/movie";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

const SearchForm = ({ title }: SearchFormProps) => {
  // 検索内容をstate管理
  const [search, setSearch] = useState("");
  // useRouterでボタンを押した後ページ遷移
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (search.trim()) {
      router.push(`/movie/search?search=${search}`);
    }
  };

  return (
    <div className={styles.searchForm}>
      <h2>{title}</h2>
      <form className={styles.searchFormContent} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="映画検索"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="submit" label="検索" variant="third" />
      </form>
    </div>
  );
};

export default SearchForm;

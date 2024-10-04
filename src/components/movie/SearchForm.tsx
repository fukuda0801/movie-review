import styles from "@/styles/pages/movie/[id]/index.module.css";
import Button from "../utils/Button";
import { SearchFormProps } from "@/types/movie";

const SearchForm = ({ title }: SearchFormProps) => {
  return (
    <div className={styles.searchForm}>
      <h2>{title}</h2>
      <form className={styles.searchFormContent}>
        <input type="text" placeholder="映画検索" />
        <Button type="submit" label="検索" variant="third" />
      </form>
    </div>
  );
};

export default SearchForm;

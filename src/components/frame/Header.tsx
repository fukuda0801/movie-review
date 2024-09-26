import Button from "../utils/Button";
import styles from "@/styles/components/frame/Header.module.css";
import { Archivo_Black } from "next/font/google";

const ArchivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
});

const Header = () => {
  return (
    <header>
      <div className={styles.headerGroup}>
        <h2 className={ArchivoBlack.className}>Movie Review</h2>
        <div className={styles.headerButtonGroup}>
          <Button type="button" label="新規登録" variant="primary" />
          <Button type="button" label="ログイン" variant="secondary" />
        </div>
      </div>
    </header>
  );
};

export default Header;

import Button from "../utils/Button";
import styles from "@/styles/components/frame/Header.module.css";
import { Archivo_Black } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const ArchivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
});

const Header = () => {
  const { login, setLogin } = useAuth(); // useAuthからログイン状態を取得
  const router = useRouter();

  // ログアウト処理
  const handleLogout = async () => {
    const response = await fetch("/api/user/logout", {
      method: "POST",
    });

    if (response.ok) {
      alert("ログアウトに成功しました");
      setLogin(false);
      router.push("/");
    } else {
      alert("ログアウトに失敗しました");
    }
  };

  return (
    <header>
      <div className={styles.headerGroup}>
        <h2 className={ArchivoBlack.className}>
          <Link href="/">Movie Review</Link>
        </h2>
        <div className={styles.headerButtonGroup}>
          {login ? (
            <>
              <Button
                type="button"
                label="ログアウト"
                variant="primary"
                handleClick={handleLogout}
              />
            </>
          ) : (
            <>
              <Link href="/user/register">
                <Button type="button" label="新規登録" variant="primary" />
              </Link>
              <Link href="/user/login">
                <Button type="button" label="ログイン" variant="secondary" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

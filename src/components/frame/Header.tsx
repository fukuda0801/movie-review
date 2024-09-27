import Button from "../utils/Button";
import styles from "@/styles/components/frame/Header.module.css";
import { Archivo_Black } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const ArchivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
});

type UserType = {
  name: string;
  email: string;
  age: number;
  gender: string;
};

const Header = () => {
  // useStateを用いてログイン
  const [login, setLogin] = useState<boolean | null>(null);
  // useRouterを使用してログアウト後にトップページに遷移させる
  const router = useRouter();

  // ログイン状態確認し、ヘッダーのボタン表示を切り替え
  const checkLogin = async () => {
    const response = await fetch("/api/user/getLoginUser");
    if (response.ok) {
      setLogin(true);
    } else {
      setLogin(false);
    }
    console.log("Login status: ", response.ok);
  };

  // checkLoginを実行し、ヘッダーのボタン表示を切り替える
  useEffect(() => {
    const handleRouteChange = () => {
      checkLogin(); // ページ遷移後にログイン状態を再確認
    };

    // ページ遷移時にログイン状態を確認
    router.events.on("routeChangeComplete", handleRouteChange);

    // クリーンアップ関数
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // ログアウト処理
  const handleLogout = async () => {
    const response = await fetch("/api/user/logout", {
      method: "POST",
    });

    if (response.ok) {
      alert("ログアウトに成功しました");
      router.push("/");
      checkLogin();
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

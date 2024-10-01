import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

// ログイン情報を保持するコンテキスト
const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [login, setLogin] = useState<boolean | null>(null);
  const router = useRouter();

  // ログイン情報を取得する関数
  const checkLogin = async () => {
    const response = await fetch("/api/user/getLoginUser");
    if (response.ok) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  useEffect(() => {
    checkLogin();

    // ページ遷移時にログイン状態を再確認
    const handleRouteChange = () => {
      checkLogin();
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <AuthContext.Provider value={{ login, setLogin }}>{children}</AuthContext.Provider>;
};

// ログイン情報をコンポーネントで利用するカスタムフック
export const useAuth = () => useContext(AuthContext);

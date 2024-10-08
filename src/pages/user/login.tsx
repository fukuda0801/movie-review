import Title from "@/components/user/Title";
import styles from "../../styles/pages/user/login.module.css";
import InputText from "@/components/user/InputText";
import Button from "@/components/utils/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation";
import { useRouter } from "next/router";
import { useState } from "react";

type LoginProps = {
  email: string;
  password: string;
};

const Login = () => {
  // React Hook Formにてフォーム管理、zodにてバリデーション管理
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginProps>({ resolver: zodResolver(loginSchema) });

  // ログイン後にトップページへ遷移
  const router = useRouter();

  // サーバーエラーをuseStateで管理
  const [serverError, setServerError] = useState<string | null>(null);

  // ログイン処理
  const onSubmit = async (data: LoginProps) => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "ユーザーのログインに失敗しました");
      }

      alert("ユーザーのログインに成功しました。");
      router.push("/");
    } catch (err: any) {
      setServerError(err.message || "サーバーエラーが発生しました");
    }
  };

  return (
    <main className={styles.loginContent}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <Title title="ログイン" />
        {serverError && <p className={styles.errorMessage}>{serverError}</p>}
        <InputText
          name="email"
          label="メールアドレス"
          type="text"
          register={register("email")}
          errorMessage={errors.email?.message}
        />
        <InputText
          name="password"
          label="パスワード"
          type="password"
          register={register("password")}
          errorMessage={errors.password?.message}
        />
        <div className={styles.buttonGroup}>
          <Button type="submit" label="ログイン" variant="primary" disabled={isSubmitting} />
          <Button type="button" label="戻る" variant="secondary" />
        </div>
      </form>
    </main>
  );
};

export default Login;

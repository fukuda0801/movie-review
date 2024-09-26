import Title from "@/components/user/Title";
import styles from "../../styles/pages/user/login.module.css";
import InputText from "@/components/user/InputText";
import Button from "@/components/utils/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation";

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

  // ログイン処理
  const onSubmit = (data: LoginProps) => {
    console.log("ログイン情報が送信されました", data);
  };
  return (
    <main className={styles.loginContent}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <Title title="ログイン" />
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

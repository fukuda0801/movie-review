import InputRadio from "@/components/user/InputRadio";
import InputText from "@/components/user/InputText";
import Title from "@/components/user/Title";
import styles from "../../styles/pages/user/register.module.css";
import Button from "@/components/utils/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validation";
import { useRouter } from "next/router";
import { useState } from "react";

type RegisterProps = {
  name: string;
  email: string;
  gender: string;
  age: string;
  password: string;
  confirmedPassword: string;
};

const Register = () => {
  // React Hook Formにてフォーム管理、zodにてバリデーション実装
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterProps>({
    resolver: zodResolver(registerSchema),
  });

  // サーバーエラーをuseStateで管理
  const [serverError, setServerError] = useState<string | null>(null);

  // useRouterでルーティング管理
  const router = useRouter();

  // 新規登録処理
  const onSubmit = async (data: RegisterProps) => {
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          gender: data.gender,
          age: data.age,
          password: data.password,
          confirmedPassword: data.confirmedPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "ユーザーの登録に失敗しました");
      }

      alert("ユーザー登録に成功しました。");
      router.push("/");
    } catch (err: any) {
      setServerError(err.message || "サーバーエラーが発生しました");
    }
  };

  return (
    <main className={styles.registerContent}>
      <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
        <Title title="アカウント登録" />
        {serverError && <p className={styles.errorMessage}>{serverError}</p>}
        <InputText
          name="name"
          label="ユーザー名"
          type="text"
          register={register("name")}
          errorMessage={errors.name?.message}
        />
        <InputText
          name="email"
          label="メールアドレス"
          type="text"
          register={register("email")}
          errorMessage={errors.email?.message}
        />
        <div className={styles.inputRadioGroup}>
          <div className={styles.inputRadioContent}>
            <label>性別</label>
            <InputRadio label="男性" value="男性" register={register("gender")} checked={true} />
            <InputRadio label="女性" value="女性" register={register("gender")} />
            <InputRadio label="その他" value="その他" register={register("gender")} />
          </div>
          {errors.gender && <p className={styles.errorMessage}>{errors.gender.message}</p>}
        </div>
        <InputText
          name="age"
          label="年齢"
          type="number"
          register={register("age", {
            setValueAs: (value) => (value === "" ? undefined : parseInt(value, 10)),
          })}
          errorMessage={errors.age?.message}
        />
        <InputText
          name="password"
          label="パスワード"
          type="password"
          register={register("password")}
          errorMessage={errors.password?.message}
        />
        <InputText
          name="confirmedPassword"
          label="確認用パスワード"
          type="password"
          register={register("confirmedPassword")}
          errorMessage={errors.confirmedPassword?.message}
        />
        <div className={styles.buttonGroup}>
          <Button type="submit" label="登録" variant="primary" disabled={isSubmitting} />
          <Button type="button" label="戻る" variant="secondary" />
        </div>
      </form>
    </main>
  );
};

export default Register;

import InputRadio from "@/components/user/InputRadio";
import InputText from "@/components/user/InputText";
import Title from "@/components/user/Title";
import styles from "../../styles/pages/user/register.module.css";
import Button from "@/components/utils/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validation";
import { useRouter } from "next/router";

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
  // useRouterでルーティング管理
  const router = useRouter();

  // 新規登録処理
  const onSubmit = (data: RegisterProps) => {
    console.log("フォームが送信されました", data);
  };

  return (
    <main className={styles.registerContent}>
      <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
        <Title title="アカウント登録" />
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

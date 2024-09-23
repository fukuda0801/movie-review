import Title from "@/components/user/Title";
import styles from "../../styles/pages/user/login.module.css";
import InputText from "@/components/user/InputText";
import Button from "@/components/utils/Button";

const Login = () => {
  return (
    <main className={styles.loginContent}>
      <form className={styles.loginForm}>
        <div>
          <Title title="ログイン" />
          <div className={styles.formSelection}>
            <InputText name="email" label="メールアドレス" type="text" />
            <InputText name="password" label="パスワード" type="password" />
            <div className={styles.buttonGroup}>
              <Button type="button" label="ログイン" variant="primary" />
              <Button type="button" label="戻る" variant="" />
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Login;

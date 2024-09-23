import InputRadio from "@/components/user/InputRadio";
import InputText from "@/components/user/InputText";
import Title from "@/components/user/Title";
import styles from "../../styles/pages/user/register.module.css";
import Button from "@/components/utils/Button";

const Register = () => {
  return (
    <main className={styles.registerContent}>
      <form className={styles.registerForm}>
        <div>
          <Title title="アカウント登録" />
          <div className={styles.formSection}>
            <InputText name="name" label="ユーザー名" type="text" />
            <InputText name="email" label="メールアドレス" type="text" />
            <div className={styles.inputRadioGroup}>
              <label>性別</label>
              <InputRadio name="gender" label="男性" value="male" />
              <InputRadio name="gender" label="女性" value="female" />
              <InputRadio name="gender" label="その他" value="other" />
            </div>
            <InputText name="age" label="年齢" type="number" />
            <InputText name="password" label="パスワード" type="password" />
            <InputText name="confirmedPassword" label="確認用パスワード" type="password" />
          </div>
          <div className={styles.buttonGroup}>
            <Button type="button" label="登録" variant="primary" />
          <Button type="button" label="戻る" variant="secondary" />
        </div>
      </form>
    </main>
  );
};

export default Register;

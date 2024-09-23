import InputRadio from "@/components/user/InputRadio";
import InputText from "@/components/user/InputText";
import Title from "@/components/user/Title";
import styles from "../../styles/pages/user/edit.module.css";
import Button from "@/components/utils/Button";

const Edit = () => {
  return (
    <main className={styles.editContent}>
      <form className={styles.editForm}>
        <Title title="ユーザー情報編集" />
        <InputText name="name" label="ユーザー名" type="text" />
        <div className={styles.inputRadioGroup}>
          <label>性別</label>
          <InputRadio name="gender" label="男性" value="male" />
          <InputRadio name="gender" label="女性" value="female" />
          <InputRadio name="gender" label="その他" value="other" />
        </div>
        <InputText name="age" label="年齢" type="number" />
        <div className={styles.buttonGroup}>
          <Button type="button" label="送信" variant="primary" />
          <Button type="button" label="キャンセル" variant="secondary" />
        </div>
      </form>
    </main>
  );
};

export default Edit;

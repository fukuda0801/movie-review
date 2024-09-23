import UserInfo from "@/components/user/UserInfo";
import styles from "../../../styles/pages/user/[id]/index.module.css";
import Title from "@/components/user/Title";
import Button from "@/components/utils/Button";

const UserIndex = () => {
  return (
    <main className={styles.userInfoContent}>
      <div className={styles.userInfo}>
        <Title title="ユーザー情報" />
        <UserInfo label="ユーザー名" content="ハム太郎" />
        <UserInfo label="メールアドレス" content="hamster@hamster.com" />
        <UserInfo label="年齢" content={20} />
        <UserInfo label="性別" content="男性" />
        <div className={styles.buttonGroup}>
          <Button type="button" label="編集" variant="primary" />
          <Button type="button" label="戻る" variant="secondary" />
        </div>
      </div>
    </main>
  );
};

export default UserIndex;

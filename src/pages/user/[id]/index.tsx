import UserInfo from "@/components/user/UserInfo";
import styles from "../../../styles/pages/user/[id]/index.module.css";
import Title from "@/components/user/Title";
import Button from "@/components/utils/Button";
import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const token = req.cookies.token;

  try {
    // サーバーサイドからAPIを呼び出し、ユーザー情報を取得
    const response = await fetch(`http://localhost:3000/api/user/getLoginUser`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    if (!response.ok) {
      return {
        props: {
          user: null,
          message: "ユーザー情報の取得に失敗しました。",
        },
      };
    }

    const data = await response.json();
    return {
      props: {
        user: data.user,
      },
    };
  } catch (error) {
    return {
      props: {
        user: null,
        message: "サーバーエラーが発生しました。",
      },
    };
  }
};

const UserIndex = ({ user }: any) => {
  console.log(user);
  return (
    <main className={styles.userInfoContent}>
      <div className={styles.userInfo}>
        <Title title="ユーザー情報" />
        <UserInfo label="ユーザー名" content={user.name} />
        <UserInfo label="メールアドレス" content={user.email} />
        <UserInfo label="年齢" content={user.age} />
        <UserInfo label="性別" content={user.gender} />
        <div className={styles.buttonGroup}>
          <Button type="button" label="編集" variant="primary" />
          <Button type="button" label="戻る" variant="secondary" />
        </div>
      </div>
    </main>
  );
};

export default UserIndex;

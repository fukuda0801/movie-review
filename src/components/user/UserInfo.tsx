import styles from "../../styles/components/user/UserInfo.module.css";

type UserInfoProps = {
  label: string;
  content: string | number;
};

const UserInfo = ({ label, content }: UserInfoProps) => {
  return (
    <div className={styles.infoGroup}>
      <p>{label}</p>
      <p>{content}</p>
    </div>
  );
};

export default UserInfo;

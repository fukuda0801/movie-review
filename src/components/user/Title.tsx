import styles from "../../styles/components/user/Title.module.css";

type TitleProps = {
  title: string;
};

const Title = ({ title }: TitleProps) => {
  return <h2 className={styles.formTitle}>{title}</h2>;
};

export default Title;

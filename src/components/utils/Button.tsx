import styles from "../../styles/components/utils/Button.module.css";

type ButtonProps = {
  type: "submit" | "reset" | "button" | undefined;
  label: string;
  variant: "" | "primary" | "secondary";
  className?: string;
  handleClick?: () => void;
};

const Button = ({ type, label, handleClick, variant }: ButtonProps) => {
  const className = `${styles.button} ${styles[variant]}`;
  return (
    <button type={type} onClick={handleClick} className={className}>
      {label}
    </button>
  );
};

export default Button;

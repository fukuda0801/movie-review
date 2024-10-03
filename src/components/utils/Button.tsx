import styles from "../../styles/components/utils/Button.module.css";

type ButtonProps = {
  type: "submit" | "reset" | "button" | undefined;
  label: string;
  variant: "" | "primary" | "secondary" | "third";
  handleClick?: () => void;
  disabled?: boolean;
};

const Button = ({ type, label, handleClick, variant, disabled }: ButtonProps) => {
  const className = `${styles.button} ${styles[variant]}`;
  return (
    <button type={type} onClick={handleClick} className={className} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;

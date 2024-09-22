import styles from "../../styles/components/user/InputText.module.css";

type InputProps = {
  label: string;
  name: string;
  type: string;
  errorMessage?: string;
  handleChange?: () => void;
};

const InputText = ({ label, name, type, handleChange }: InputProps) => {
  return (
    <div className={styles.inputContent}>
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} onChange={handleChange} />
    </div>
  );
};

export default InputText;

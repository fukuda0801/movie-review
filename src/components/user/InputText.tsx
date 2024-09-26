import { UseFormRegisterReturn } from "react-hook-form";
import styles from "../../styles/components/user/InputText.module.css";

type InputProps = {
  label: string;
  name: string;
  type: string;
  errorMessage?: string;
  register: UseFormRegisterReturn;
};

const InputText = ({ label, name, type, register, errorMessage }: InputProps) => {
  return (
    <div className={styles.inputContent}>
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} {...register} />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default InputText;

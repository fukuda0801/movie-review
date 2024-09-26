import { UseFormRegisterReturn } from "react-hook-form";
import styles from "../../styles/components/user/InputRadio.module.css";

type InputRadioProps = {
  label: string;
  value: string;
  register: UseFormRegisterReturn;
  checked?: boolean;
};

const InputRadio = ({ label, value, register, checked }: InputRadioProps) => {
  return (
    <div className={styles.inputRadioGroup}>
      <label htmlFor={value}>{label}</label>
      <input type="radio" id={value} value={value} {...register} checked={checked} />
    </div>
  );
};

export default InputRadio;

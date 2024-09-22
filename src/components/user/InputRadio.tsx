import styles from "../../styles/components/user/InputRadio.module.css";

type InputRadioProps = {
  label: string;
  name: string;
  value: string;
};

const InputRadio = ({ label, name, value }: InputRadioProps) => {
  return (
    <div className={styles.inputRadioGroup}>
      <label htmlFor={value}>{label}</label>
      <input type="radio" id={value} name={name} value={value} />
    </div>
  );
};

export default InputRadio;

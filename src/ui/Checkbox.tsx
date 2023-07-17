import CheckmarkIcon from "../assets/CheckmarkIcon";
import { CheckboxProps } from "../types/types";
import styles from "./Checkbox.module.scss";

function Checkbox({ checked, disabled, onChange, children }: CheckboxProps) {
  return (
    <label
      className={`${styles.checkbox} ${checked ? styles.checked : ""} ${
        disabled ? styles.disabled : ""
      }`}
    >
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={styles.icon}>{checked && <CheckmarkIcon />}</span>
      {children ? <span className={styles.text}>{children}</span> : null}
    </label>
  );
}

export default Checkbox;

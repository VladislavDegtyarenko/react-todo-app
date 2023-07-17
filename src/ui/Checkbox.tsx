import CheckmarkIcon from "../assets/CheckmarkIcon";
import { CheckboxProps } from "../types/types";
import "./Checkbox.css";

function Checkbox({ checked, disabled, onChange, children }: CheckboxProps) {
  return (
    <label
      className={`${checked ? "Checkbox checked" : "Checkbox"} ${disabled ? "disabled" : ""}`}
    >
      <input type="checkbox" checked={checked || false} onChange={onChange} />
      <span className="Checkbox__icon">{checked && <CheckmarkIcon />}</span>
      {children && <span className="Checkbox__text">{children}</span>}
    </label>
  );
}

export default Checkbox;

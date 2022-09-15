import CheckmarkIcon from "../assets/CheckmarkIcon";
import "./Checkbox.css";

function Checkbox(props) {
   return (
      <label className={props.checked ? "Checkbox checked" : "Checkbox"} disabled={props.disabled}>
         <input type="checkbox" checked={props.checked} onChange={props.onChange} />
         <span>{props.checked && <CheckmarkIcon />}</span>
      </label>
   );
}

export default Checkbox;

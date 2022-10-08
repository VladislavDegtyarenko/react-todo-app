import CheckmarkIcon from "../assets/CheckmarkIcon";
import "./Checkbox.css";

function Checkbox(props) {
   return (
      <label
         className={props.checked ? "Checkbox checked" : "Checkbox"}
         disabled={props.disabled}
      >
         <input
            type="checkbox"
            checked={props.checked || false}
            onChange={props.onChange}
         />
         <span className="Checkbox__icon">
            {props.checked && <CheckmarkIcon />}
         </span>
         {props.children && <span className="Checkbox__text">{props.children}</span>}
      </label>
   );
}

export default Checkbox;

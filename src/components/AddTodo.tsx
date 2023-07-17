import { AddTodoProps } from "../types/types";
import styles from "./AddTodo.module.scss";

function AddTodo({ addTodo, ...inputProps }: AddTodoProps) {
  return (
    <form onSubmit={addTodo} className={styles.addTodo}>
      <input type="text" placeholder="Type your todo here" {...inputProps} />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodo;

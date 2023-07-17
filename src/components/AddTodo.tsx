import { AddTodoProps } from "../types/types";
import "./AddTodo.css";

function AddTodo({ addTodo, ...inputProps }: AddTodoProps) {
  return (
    <form onSubmit={addTodo} className="add-todo">
      <input type="text" placeholder="Type your todo here" {...inputProps} />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodo;

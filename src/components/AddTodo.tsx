import { AddTodoProps } from "../types/types";
import "./AddTodo.css";

function AddTodo({ addTodo, handleChange, formData }: AddTodoProps) {
  return (
    <form onSubmit={addTodo} className="add-todo">
      <input
        onChange={handleChange}
        value={formData}
        type="text"
        placeholder="Type your todo here"
      />
      <button>Add</button>
    </form>
  );
}

export default AddTodo;

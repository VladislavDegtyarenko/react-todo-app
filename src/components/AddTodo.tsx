import { FormEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import { todoAdded } from "../features/todosSlice";
import styles from "./AddTodo.module.scss";

function AddTodo() {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!inputRef.current) return;

    const todoName = inputRef.current?.value.trim();

    if (todoName.length === 0) return;

    inputRef.current.value = "";

    dispatch(todoAdded(todoName));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addTodo}>
      <input type="text" placeholder="Type your todo here" ref={inputRef} />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodo;

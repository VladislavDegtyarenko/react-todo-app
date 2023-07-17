import { useEffect, memo, useState, useRef, ChangeEvent, KeyboardEvent } from "react";

// ui
import Checkbox from "../ui/Checkbox.jsx";

// icons
import DeleteIcon from "../assets/DeleteIcon.jsx";
import EditIcon from "../assets/EditIcon.jsx";
import SaveIcon from "../assets/SaveIcon";
import CancelIcon from "../assets/CancelIcon";

// styles
import "./TodoItem.css";
import { TodoItemProps } from "../types/types.js";

function TodoItem({
  id,
  name,
  isDone,
  fadedIn,
  renameTodo,
  deleteTodo,
  doneTodo,
  setTodoFadedIn,
  className,
  dataPosition,
  onDragStart,
  onDragOver,
  onDrop,
  onDragLeave,
}: TodoItemProps) {
  const [editingState, setEditingState] = useState(false);
  const [inputName, setInputName] = useState(name);

  const ref = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (!fadedIn && ref.current) {
      setTodoFadedIn(id, true);
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };

  const saveChanges = () => {
    renameTodo(id, inputName.trim());
    setEditingState(false);
  };

  const cancelChanges = () => {
    setInputName(name);
    setEditingState(false);
  };

  const handleDeleteTodo = () => {
    //setIsFadedOut(true);
    setTodoFadedIn(id, false);

    setTimeout(() => deleteTodo(id), 150);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    e.key === "Enter" && saveChanges();
    e.key === "Escape" && cancelChanges();
  };

  const enterEditingState = () => setEditingState(true);

  let itemClassName = "todo-item";
  if (className) itemClassName += ` ${className}`;
  if (fadedIn) itemClassName += ` todo-item--fade-in`;

  return (
    <li
      className={itemClassName}
      draggable={true}
      data-position={dataPosition}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
      ref={ref}
    >
      {editingState ? (
        <>
          <Checkbox checked={isDone} onChange={() => doneTodo(id)} disabled={true} />
          <input
            type="text"
            className="todo-item__name"
            value={inputName}
            onChange={handleInputName}
            onKeyDown={handleKeyPress}
            autoFocus
          />

          <button onClick={saveChanges}>
            <SaveIcon />
          </button>
          <button onClick={cancelChanges}>
            <CancelIcon />
          </button>
        </>
      ) : (
        <>
          <Checkbox checked={isDone} onChange={() => doneTodo(id)} />
          <div className={isDone ? "todo-item__name done" : "todo-item__name"}>
            {name}
          </div>

          <button onClick={enterEditingState}>
            <EditIcon />
          </button>
          <button onClick={handleDeleteTodo}>
            <DeleteIcon />
          </button>
        </>
      )}
    </li>
  );
}

export default memo(TodoItem);

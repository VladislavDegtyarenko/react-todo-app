import { useEffect, memo, useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { useDispatch } from "react-redux";
import { todoDeleted, todoDone, todoRenamed } from "../features/todosSlice.js";
import { motion, AnimatePresence } from "framer-motion";

// ui
import Checkbox from "../ui/Checkbox.jsx";

// icons
import DeleteIcon from "../assets/DeleteIcon.jsx";
import EditIcon from "../assets/EditIcon.jsx";
import SaveIcon from "../assets/SaveIcon";
import CancelIcon from "../assets/CancelIcon";

// styles
import styles from "./TodoItem.module.scss";
import { TodoItemProps } from "../types/types.js";

function TodoItem({
  id,
  name,
  isDone,
  dataPosition,
  isDropArea,
  onDragStart,
  onDragOver,
  onDrop,
  onDragLeave,
}: TodoItemProps) {
  const dispatch = useDispatch();

  const [editingState, setEditingState] = useState(false);
  const [inputName, setInputName] = useState(name);

  const ref = useRef<HTMLLIElement | null>(null);

  const handleInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };

  const saveChanges = () => {
    dispatch(todoRenamed({ id, name: inputName.trim() }));
    setEditingState(false);
  };

  const cancelChanges = () => {
    setInputName(name);
    setEditingState(false);
  };

  const deleteTodo = () => {
    dispatch(todoDeleted(id));
  };

  const doneTodo = () => {
    dispatch(todoDone(id));
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    e.key === "Enter" && saveChanges();
    e.key === "Escape" && cancelChanges();
  };

  const enterEditingState = () => setEditingState(true);

  return (
    // <AnimatePresence>
    <motion.li
      key={id}
      className={`${styles.todoItem} ${isDropArea ? styles.dropArea : ""} ${
        styles.fadeIn
      }`}
      draggable={true}
      data-position={dataPosition}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
      ref={ref}
      initial={{ opacity: 0.5, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
      transition={{ duration: 0.1 }}
      whileTap={{ scale: 0.98 }}
    >
      {editingState ? (
        <>
          <Checkbox checked={isDone} onChange={doneTodo} disabled={true} />
          <input
            type="text"
            className={styles.todoItemName}
            value={inputName}
            onChange={handleInputName}
            onKeyDown={handleKeyPress}
            autoFocus
          />

          <button onClick={saveChanges}>
            <SaveIcon />
          </button>
          <button onClick={cancelChanges} className={styles.secondaryBtn}>
            <CancelIcon />
          </button>
        </>
      ) : (
        <>
          <Checkbox checked={isDone} onChange={doneTodo} />
          <div className={`${styles.todoItemName} ${isDone ? styles.done : ""}`}>
            {name}
          </div>

          <button onClick={enterEditingState}>
            <EditIcon />
          </button>
          <button onClick={deleteTodo} className={styles.secondaryBtn}>
            <DeleteIcon />
          </button>
        </>
      )}
    </motion.li>
    // </AnimatePresence>
  );
}

export default memo(TodoItem);

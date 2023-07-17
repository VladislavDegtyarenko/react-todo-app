// Core
import { memo } from "react";

// UI
import TodoItem from "../components/TodoItem";

// Assets
import PaperIcon from "../assets/PaperIcon";

// Styles
import styles from "./TodoList.module.scss";

// TS
import { TodoListProps } from "../types/types";

function TodoList({ todos, dragAndDrop, ...todoItemProps }: TodoListProps) {
  if (!todos || todos.length === 0) {
    return (
      <div className={styles.todoEmpty}>
        <PaperIcon />
        <h3>Your todo list is empty.</h3>
        <h5>Start by adding a new one!</h5>
      </div>
    );
  }

  return (
    <div className={styles.todoListWrapper}>
      <ul className={styles.todoList}>
        {todos.map((todo, index) => {
          return (
            <TodoItem
              key={todo.id}
              id={todo.id}
              name={todo.name}
              isDone={todo.isDone}
              fadedIn={todo.fadedIn}
              dataPosition={index}
              className={
                dragAndDrop && dragAndDrop.draggedTo === Number(index) ? "dropArea" : ""
              }
              {...todoItemProps}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default memo(TodoList);

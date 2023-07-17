// Core
import { memo } from "react";

// UI
import TodoItem from "../components/TodoItem";

// Assets
import PaperIcon from "../assets/PaperIcon";

// Styles
import "./TodoList.css";

// TS
import { TodoListProps } from "../types/types";

function TodoList({ todos, dragAndDrop, ...todoItemProps }: TodoListProps) {
  if (!todos || todos.length === 0) {
    return (
      <div className="todo-empty">
        <PaperIcon />
        <h3>Your todo list is empty.</h3>
        <h5>Start by adding a new one!</h5>
      </div>
    );
  }

  return (
    <div className="todo-list__wrapper">
      <ul className="todo-list">
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

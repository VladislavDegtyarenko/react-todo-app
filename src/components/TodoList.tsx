import TodoItem from "../components/TodoItem";
import Checkbox from "../ui/Checkbox";

// Assets
import PaperIcon from "../assets/PaperIcon";

import "./TodoList.css";
import { TodoListProps } from "../types/types";

function TodoList({ todos, dragAndDrop, ...todoItemProps }: TodoListProps) {
  const todoElements =
    todos &&
    todos.map((todo, index) => {
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
    });

  if (todos && todos.length > 0) {
    return (
      <div className="todo-list__wrapper">
        <ul className="todo-list">{todoElements}</ul>
      </div>
    );
  }

  return (
    <div className="todo-empty">
      <PaperIcon />
      <h3>Your todo list is empty.</h3>
      <h5>Start by adding a new one!</h5>
    </div>
  );
}

export default TodoList;

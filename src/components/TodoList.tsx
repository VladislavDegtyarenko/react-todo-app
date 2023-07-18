// Core
import { useState, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todoOrderUpdated } from "../features/todosSlice";
import { AnimatePresence } from "framer-motion";

// UI
import TodoItem from "../components/TodoItem";

// Assets
import PaperIcon from "../assets/PaperIcon";

// Styles
import styles from "./TodoList.module.scss";

// TS
import {
  InitialDnDState,
  OnDragLeave,
  OnDragOver,
  OnDragStart,
  OnDrop,
} from "../types/types";
import { RootState } from "../store/store";

const initialDnDState: InitialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

function TodoList() {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  // Todos Order
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  const onDragStart: OnDragStart = useCallback(
    (e) => {
      const initialPosition = Number(e.currentTarget.dataset.position);

      setDragAndDrop((prevDragAndDrop) => ({
        ...prevDragAndDrop,
        draggedFrom: initialPosition,
        isDragging: true,
        originalOrder: todos,
      }));

      // for Firefox
      e.dataTransfer.setData("text/html", "");
    },
    [todos]
  );

  const onDragOver: OnDragOver = useCallback(
    (e) => {
      e.preventDefault();

      let newList = dragAndDrop.originalOrder;

      // index of the item being dragged
      const draggedFrom = dragAndDrop.draggedFrom;

      // index of the droppable area being hovered
      const draggedTo = Number(e.currentTarget.dataset.position);

      const itemDragged = newList[draggedFrom as number];
      const remainingItems = newList.filter((item, index) => index !== draggedFrom);

      // prettier-ignore
      newList = [
        ...remainingItems.slice(0, draggedTo),
        itemDragged,
        ...remainingItems.slice(draggedTo)
      ];

      if (draggedTo !== dragAndDrop.draggedTo) {
        setDragAndDrop((prevDragAndDrop) => ({
          ...prevDragAndDrop,
          updatedOrder: newList,
          draggedTo: draggedTo,
        }));
      }
    },
    [dragAndDrop]
  );

  const onDrop: OnDrop = useCallback(() => {
    dispatch(todoOrderUpdated(dragAndDrop.updatedOrder));

    setDragAndDrop((prevDragAndDrop) => ({
      ...prevDragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    }));
  }, [dragAndDrop]);

  const onDragLeave: OnDragLeave = useCallback(() => {
    setDragAndDrop((prevDragAndDrop) => ({
      ...prevDragAndDrop,
      draggedTo: null,
    }));
  }, []);

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
        <AnimatePresence>
          {todos.map((todo, index) => {
            return (
              <TodoItem
                key={todo.id}
                id={todo.id}
                name={todo.name}
                isDone={todo.isDone}
                dataPosition={index}
                isDropArea={dragAndDrop && dragAndDrop.draggedTo === Number(index)}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onDragLeave={onDragLeave}
              />
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default memo(TodoList);

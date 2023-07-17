import { useState, useCallback, FormEvent, memo } from "react";
import { nanoid } from "nanoid";

// components
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";

// Hooks
import { useLocalStorage } from "usehooks-ts";

// styles
import "./Main.css";

//TS
import {
  AddTodoFunc,
  DeleteTodo,
  DoneTodo,
  InputValue,
  InitialDnDState,
  OnDragLeave,
  OnDragOver,
  OnDragStart,
  OnDrop,
  RenameTodo,
  SetTodoFadedIn,
  Todo,
} from "../types/types";

const initialDnDState: InitialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

const DEFAULT_TODOS: Todo[] = [];

const Main = () => {
  const [todos, setTodos] = useLocalStorage("todos", DEFAULT_TODOS);
  const [inputValue, setInputValue] = useState<InputValue>("");
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const addTodo: AddTodoFunc = useCallback(
    (e) => {
      e.preventDefault();

      const todoName = inputValue.trim();

      if (!todoName) return;

      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: nanoid(),
          name: todoName,
          editingState: false,
          isDone: false,
        },
      ]);

      setInputValue("");
    },
    [inputValue]
  );

  const deleteTodo: DeleteTodo = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const renameTodo: RenameTodo = useCallback((id, newName) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        return todo.id === id ? { ...todo, name: newName } : todo;
      })
    );
  }, []);

  const doneTodo: DoneTodo = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo?.isDone } : todo
      )
    );
  }, []);

  const setTodoFadedIn: SetTodoFadedIn = useCallback((id, value) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        return todo.id === id ? { ...todo, fadedIn: value } : todo;
      })
    );
  }, []);

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
    setTodos(dragAndDrop.updatedOrder);

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

  return (
    /* prettier-ignore */
    <div className="main-todo">
      <TodoList
        todos={todos}
        renameTodo={renameTodo}
        deleteTodo={deleteTodo}
        doneTodo={doneTodo}
        setTodoFadedIn={setTodoFadedIn}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragLeave={onDragLeave}
        dragAndDrop={dragAndDrop}
      />

      <AddTodo
        addTodo={addTodo}
        onChange={handleChange}
        value={inputValue}
      />
    </div>
  );
};

export default memo(Main);

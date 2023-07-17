import { useState, useEffect, FormEvent, MouseEvent, DragEvent } from "react";
import { nanoid } from "nanoid";

// components
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import Checkbox from "../ui/Checkbox";

// Hooks
import { useLocalStorage } from "usehooks-ts";

// styles
import "./Main.css";

//TS
import {
  AddTodoFunc,
  DeleteTodo,
  DoneTodo,
  FormData,
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

export default function Main() {
  const [todos, setTodos] = useLocalStorage("todos", DEFAULT_TODOS);
  const [formData, setFormData] = useState<FormData>("");
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  function handleChange(e: FormEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    setFormData(value);
  }

  const addTodo: AddTodoFunc = (e) => {
    e.preventDefault();

    const todoName = formData.trim();

    if (!todoName) return;

    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: nanoid(),
          name: todoName,
          editingState: false,
          isDone: false,
        },
      ];
    });

    setFormData("");
  };

  const deleteTodo: DeleteTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const renameTodo: RenameTodo = (id, newName) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        return todo.id === id ? { ...todo, name: newName } : todo;
      })
    );
  };

  const doneTodo: DoneTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo?.isDone } : todo
      )
    );
  };

  const setTodoFadedIn: SetTodoFadedIn = (id, value) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, fadedIn: value } : todo))
    );
  };

  const onDragStart: OnDragStart = (e) => {
    console.log("e: ", e);
    const initialPosition = Number(e.currentTarget.dataset.position);

    setDragAndDrop((prevDragAndDrop) => ({
      ...prevDragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: todos,
    }));

    // for Firefox
    e.dataTransfer.setData("text/html", "");
  };

  const onDragOver: OnDragOver = (e) => {
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
  };

  const onDrop: OnDrop = () => {
    setTodos(dragAndDrop.updatedOrder);

    setDragAndDrop((prevDragAndDrop) => ({
      ...prevDragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    }));
  };

  const onDragLeave: OnDragLeave = () => {
    setDragAndDrop((prevDragAndDrop) => ({
      ...prevDragAndDrop,
      draggedTo: null,
    }));
  };

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
        handleChange={handleChange}
        formData={formData}
      />
    </div>
  );
}

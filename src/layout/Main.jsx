import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

// components
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";

// styles
import "./Main.css";

const initialDnDState = {
   draggedFrom: null,
   draggedTo: null,
   isDragging: false,
   originalOrder: [],
   updatedOrder: [],
};

export default function Main() {
   const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
   const [formData, setFormData] = useState("");
   const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

   useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
   }, [todos]);

   function handleChange(e) {
      const { value } = e.target;
      setFormData(value);
   }

   function addTodo(e) {
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
   }

   function deleteTodo(id) {
      setTodos((prevTodos) => {
         return prevTodos.filter((todo) => todo.id !== id);
      });
   }

   function renameTodo(id, newName) {
      setTodos((prevTodos) =>
         prevTodos.map((todo) => {
            return todo.id === id ? { ...todo, name: newName } : todo;
         })
      );
   }

   const doneTodo = (id) => {
      setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo?.isDone } : todo)));
   };

   const setTodoFadedIn = (id, value) => {
      setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, fadedIn: value } : todo)));
   };

   const onDragStart = (e) => {
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

   const onDragOver = (e) => {
      e.preventDefault();

      let newList = dragAndDrop.originalOrder;

      // index of the item being dragged
      const draggedFrom = dragAndDrop.draggedFrom;

      // index of the droppable area being hovered
      const draggedTo = Number(e.currentTarget.dataset.position);

      const itemDragged = newList[draggedFrom];
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

   const onDrop = (e) => {
      setTodos(dragAndDrop.updatedOrder);

      setDragAndDrop((prevDragAndDrop) => ({
         ...prevDragAndDrop,
         draggedFrom: null,
         draggedTo: null,
         isDragging: false,
      }));
   };

   const onDragLeave = () => {
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

import { useState, useRef } from "react";

// ui
import Checkbox from "../ui/Checkbox.jsx";

// icons
import DeleteIcon from "../assets/DeleteIcon.jsx";
import EditIcon from "../assets/EditIcon.jsx";
import SaveIcon from "../assets/SaveIcon";
import CancelIcon from "../assets/CancelIcon";

// styles
import "./TodoItem.css";
import { useEffect } from "react";

export default function TodoItem(props) {
   let {
      draggable,
      dataPosition,
      onDragStart,
      onDragOver,
      onDrop,
      onDragLeave,
      className,
      id,
      name,
      isDone,
      fadedIn,
      renameTodo,
      deleteTodo,
      doneTodo,
      setTodoFadedIn,
   } = props;

   const [editingState, setEditingState] = useState(false);
   const [inputName, setInputName] = useState(name);
   const [isFadedOut, setIsFadedOut] = useState(false);

   const ref = useRef();

   useEffect(() => {
      if (!fadedIn) {
         setTodoFadedIn(id, true);
         ref.current.scrollIntoView({ behavior: "smooth" });
      }
   }, []);

   const handleInputName = (e) => {
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

      setTimeout(() => deleteTodo(), 150);
   };

   const handleKeyPress = (e) => {
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
         draggable={draggable}
         data-position={dataPosition}
         onDragStart={onDragStart}
         onDragOver={onDragOver}
         onDrop={onDrop}
         onDragLeave={onDragLeave}
         ref={ref}
      >
         {editingState ? (
            <>
               <Checkbox checked={isDone} onChange={doneTodo} disabled={true} />
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
               <Checkbox checked={isDone} onChange={doneTodo} />
               <div className={isDone ? "todo-item__name done" : "todo-item__name"}>{name}</div>

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

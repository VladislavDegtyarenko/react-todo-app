import TodoItem from "../components/TodoItem";

// Assets
import PaperIcon from "../assets/PaperIcon";

import "./TodoList.css";

function TodoList(props) {
   /* prettier-ignore */
   const {
      todos,
      renameTodo,
      deleteTodo,
      doneTodo,
      setTodoFadedIn,
      onDragStart,
      onDragOver,
      onDrop,
      onDragLeave,
      dragAndDrop
   } = props;

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
               deleteTodo={() => deleteTodo(todo.id)}
               renameTodo={renameTodo}
               doneTodo={() => doneTodo(todo.id)}
               setTodoFadedIn={setTodoFadedIn}
               draggable={true}
               dataPosition={index}
               onDragStart={onDragStart}
               onDragOver={onDragOver}
               onDrop={onDrop}
               onDragLeave={onDragLeave}
               className={dragAndDrop && dragAndDrop.draggedTo === Number(index) ? "dropArea" : ""}
            />
         );
      });

   if (todos && todos.length > 0) {
      return <ul className="todo-list">{todoElements}</ul>;
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

import "./AddTodo.css";

function AddTodo(props) {
   return (
      <form onSubmit={props.addTodo} className="add-todo">
         {/* prettier-ignore */}
         <input
               onChange={props.handleChange}
               value={props.formData}
               type="text"
               placeholder="Type your todo here"
            />
         <button>Add</button>
      </form>
   );
}

export default AddTodo;

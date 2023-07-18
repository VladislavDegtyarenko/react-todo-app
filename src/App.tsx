import React, { useState, useEffect } from "react";

// import layout components
import Header from "./layout/Header";
import Footer from "./layout/Footer";

// components
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

// styles
import styles from "./App.module.scss";

function App() {
  return (
    <>
      <Header />
      <div className={styles.main}>
        <TodoList />
        <AddTodo />
      </div>
      <Footer />
    </>
  );
}

export default App;

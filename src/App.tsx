import React, { useState, useEffect } from "react";

// import layout components
import Header from "./layout/Header";
import Main from "./layout/Main";
import Footer from "./layout/Footer";

// Hooks
import { useLocalStorage } from "usehooks-ts";

const DEFAULT_DARK_THEME = true;

function App() {
  const [darkTheme, setDarkTheme] = useLocalStorage("darkTheme", DEFAULT_DARK_THEME);

  useEffect(() => {
    if (darkTheme) {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [darkTheme]);

  const toggleDarkTheme = () => {
    setDarkTheme((t) => !t);
  };

  return (
    <>
      <Header toggleDarkTheme={toggleDarkTheme} darkTheme={darkTheme} />
      <Main />
      <Footer />
    </>
  );
}

export default App;

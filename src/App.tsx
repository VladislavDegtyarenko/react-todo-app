import React, { useState, useEffect } from "react";

// import layout components
import Header from "./layout/Header";
import Main from "./layout/Main";
import Footer from "./layout/Footer";

const DEFAULT_DARK_THEME = true;

function App() {
  const [darkTheme, setDarkTheme] = useState<boolean>(() => {
    try {
      const isDarkTheme = localStorage.getItem("darkTheme");

      if (isDarkTheme) return JSON.parse(isDarkTheme);
    } catch (error) {
      console.error(error);
    }

    return DEFAULT_DARK_THEME;
  });

  useEffect(() => {
    localStorage.setItem("darkTheme", JSON.stringify(darkTheme));

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

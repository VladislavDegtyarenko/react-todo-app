import { useEffect } from "react";
import DarkModeToggle from "../ui/DarkModeToggle";

// Redux
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { toggleDarkTheme } from "../features/darkThemeSlice";

// Styles
import styles from "./Header.module.scss";

export default function Header() {
  const darkTheme = useSelector((state: RootState) => state.darkTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (darkTheme) {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [darkTheme]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span>Todo</span> App
        </h1>

        <DarkModeToggle
          isDarkMode={darkTheme}
          toggleDarkMode={() => dispatch(toggleDarkTheme())}
        />
      </div>
    </header>
  );
}

import { HeaderProps } from "../types/types";
import Checkbox from "../ui/Checkbox";
import DarkModeToggle from "../ui/DarkModeToggle";
import styles from "./Header.module.scss";

export default function Header({ darkTheme, toggleDarkTheme }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span>Todo</span> App
        </h1>

        <DarkModeToggle isDarkMode={darkTheme} toggleDarkMode={toggleDarkTheme} />
      </div>
    </header>
  );
}

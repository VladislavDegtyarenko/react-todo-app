import { HeaderProps } from "../types/types";
import Checkbox from "../ui/Checkbox";
import styles from "./Header.module.scss";

export default function Header({ darkTheme, toggleDarkTheme }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <span>React</span> Todo App
      </h1>
      <Checkbox onChange={toggleDarkTheme} checked={darkTheme}>
        Dark Theme
      </Checkbox>
    </header>
  );
}

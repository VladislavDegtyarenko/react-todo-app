import MoonIcon from "../assets/Moon";
import SunIcon from "../assets/Sun";
import { DarkModeToggleProps } from "../types/types";

import styles from "./DarkModeToggle.module.scss";

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }: DarkModeToggleProps) => {
  return (
    <label
      aria-label={`switch to ${isDarkMode ? "light" : "dark"} theme`}
      className={styles.darkModeToggle}
    >
      <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
      <span className={styles.slider}></span>
      <MoonIcon className={styles.moon} />
      <SunIcon className={styles.sun} />
    </label>
  );
};

export default DarkModeToggle;

import React from "react";
import { HeaderProps } from "../types/types";
import Checkbox from "../ui/Checkbox";
import "./Header.css";

export default function Header({ darkTheme, toggleDarkTheme }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header__title">
        <span>React</span> Todo App
      </h1>
      <Checkbox onChange={toggleDarkTheme} checked={darkTheme}>
        Dark Theme
      </Checkbox>
    </header>
  );
}

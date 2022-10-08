import React from "react";
import Checkbox from "../ui/Checkbox";
import "./Header.css";

export default function Header(props) {
   return <header className="header">
      <h1 className="header__title">
         <span>React</span> Todo App
      </h1>
      <Checkbox onChange={props.toggleDarkTheme} checked={props.darkTheme}>Dark Theme</Checkbox>
   </header>;
}

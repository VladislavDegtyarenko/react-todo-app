import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <small className="footer__copyright">
        © Copyright {new Date().getFullYear()} |&nbsp;
        <a href="https://vd-developer.vercel.app/" target="_blank">
          Vladyslav Dihtiarenko
        </a>
        &nbsp;| All Rights Reserved
      </small>
    </footer>
  );
}

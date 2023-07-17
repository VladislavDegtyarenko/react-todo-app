import React from "react";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <small className={styles.footerCopyright}>
        © Copyright {new Date().getFullYear()} |&nbsp;
        <a href="https://vd-developer.vercel.app/" target="_blank">
          Vladyslav Dihtiarenko
        </a>
        &nbsp;| All Rights Reserved
      </small>
    </footer>
  );
}

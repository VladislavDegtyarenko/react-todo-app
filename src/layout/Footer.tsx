import React from "react";
import "./Footer.css";

export default function Footer() {
   return (
      <footer className="footer">
         <small className="footer__copyright">
            &#169; All Rights Reserved.{" "}
            <a href="https://github.com/VladislavDegtyarenko/" target="_blank">
               Vladyslav Dihtiarenko
            </a>
         </small>
      </footer>
   );
}

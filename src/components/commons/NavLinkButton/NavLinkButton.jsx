import React from "react";
import c from "classnames";
import styles from "./NavLinkButton.module.css";

const NavLintButton = ({ text, handleClick, selected }) => (
  <div
    onClick={handleClick}
    className={c("btn nav-link active pointer", selected && styles.selected)}
  >
    {text}
  </div>
);

export default NavLintButton;

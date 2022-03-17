import React from "react";

const BaseButton = ({ stylesButton, text, handleButton }) => (
  <button onClick={handleButton} className={stylesButton}>
    {text}
  </button>
);

export default BaseButton;

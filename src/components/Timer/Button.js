import React from "react";
import "./Timer.css";

const Button = ({ children, second, setSecond, isDisableButton }) => {
  let plusSecond;
  if (children === "1H") {
    plusSecond = 60 * 60;
  } else if (children === "10M") {
    plusSecond = 60 * 10;
  } else if (children === "1M") {
    plusSecond = 60;
  } else {
    plusSecond = 10;
  }
  return (
    <button
      onClick={(e) => setSecond((second) => second + plusSecond)}
      className={isDisableButton ? "disable" : "enable"}
      disabled={isDisableButton}
    >
      {children}
    </button>
  );
};

export default Button;

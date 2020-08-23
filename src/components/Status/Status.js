import React from "react";
import "./Status.css";
import startIcon from "../../icons/start.svg";
import chillingIcon from "../../icons/chilling.svg";
import multitaskingIcon from "../../icons/multitasking.svg";

const Status = ({ timer }) => {
  const filterImage = (timer) => {
    if (timer === 0) {
      return chillingIcon;
    } else if (timer === 1) {
      return multitaskingIcon;
    } else {
      return startIcon;
    }
  };

  const fileterText = (timer) => {
    if (timer === 0) {
      return "お疲れ様でした！休憩しましょう";
    } else if (timer === 1) {
      return "休憩まで頑張りましょう！";
    } else {
      return "準備ができたら始めましょう";
    }
  };

  return (
    <div className="statusContainer">
      <span className="statusText">{fileterText(timer)}</span>
      <img
        className="statusImage"
        alt="Working status"
        src={filterImage(timer)}
      />
    </div>
  );
};

export default Status;

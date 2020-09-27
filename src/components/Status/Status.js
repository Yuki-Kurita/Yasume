import React from "react";
import moment from "moment";
import "./Status.css";
import startIcon from "../../icons/start.svg";
import chillingIcon from "../../icons/chilling.svg";
import multitaskingIcon from "../../icons/multitasking.svg";

const Status = ({
  workingStatus,
  work,
  setWork,
  setSecond,
  setInitialSecond,
  setWorkingStatus,
  setIsDisableButton,
  setTimerId,
  setStartTime,
  isDisableButton,
}) => {
  const filterImage = (workingStatus) => {
    if (workingStatus === 0) {
      return chillingIcon;
    } else if (workingStatus === 1) {
      return multitaskingIcon;
    } else {
      return startIcon;
    }
  };

  const fileterText = (workingStatus) => {
    if (workingStatus === 0) {
      return "お疲れ様でした！休憩しましょう";
    } else if (workingStatus === 1) {
      if (work) {
        return "休憩まで頑張りましょう！";
      } else {
        return "今している作業を書いておきましょう！👇";
      }
    } else {
      return "作業時間を設定してください！";
    }
  };

  const handleWorkChange = (e) => {
    setWork(e.target.value);
  };

  const startTimer = (min, e) => {
    setSecond(min * 60);
    setInitialSecond(min * 60);
    setStartTime(moment().format("YYYY-MM-DD hh:mm:ss"));
    e.preventDefault();
    // 休憩中(0)の状態で開始したら0のまま
    if (workingStatus === 1 || workingStatus === 2) {
      setWorkingStatus(1);
    }
    setIsDisableButton(true);
    setTimerId(
      setInterval(() => {
        setSecond((second) => second - 1);
      }, 1000)
    );
  };

  return (
    <div className="statusContainer">
      <div className="workingContent">
        <div className="statusText">{fileterText(workingStatus)}</div>
        <img
          className="statusImage"
          alt="Working status"
          src={filterImage(workingStatus)}
        />
      </div>
      {/* workingStatusの値によって状態を変える */}
      {workingStatus === 0 && (
        <div className="breakTimeSelectContainer">
          <button
            className={`tenMinuteBreak ${
              isDisableButton ? "disable" : "enable"
            }`}
            onClick={(e) => startTimer(10, e)}
            disabled={isDisableButton}
          >
            10分休憩する
          </button>
          <button
            className={`fiveMinuteBreak ${
              isDisableButton ? "disable" : "enable"
            }`}
            onClick={(e) => startTimer(5, e)}
            disabled={isDisableButton}
          >
            5分休憩する
          </button>
        </div>
      )}
      {workingStatus === 1 && (
        <input
          className="workingContentInput"
          type="text"
          value={work}
          onChange={handleWorkChange}
          placeholder="今何をしていますか？"
        />
      )}
      {workingStatus === 2 && (
        <div className="workingSelectContainer">
          <button className="continueButton" onClick={(e) => startTimer(25, e)}>
            25分作業する
          </button>
          <button className="cancelButton" onClick={(e) => startTimer(60, e)}>
            60分作業する
          </button>
        </div>
      )}
    </div>
  );
};

export default Status;

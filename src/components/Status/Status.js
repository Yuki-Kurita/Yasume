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
  const filterImage = (nextAction) => {
    if (nextAction === "break") {
      return chillingIcon;
    } else if (nextAction === "work") {
      return multitaskingIcon;
    } else {
      return startIcon;
    }
  };

  const filterText = (nextAction) => {
    if (nextAction === "break") {
      return "お疲れ様でした！休憩しましょう";
    } else if (nextAction === "work") {
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

  const startTimer = (second, e) => {
    const startMoment = moment();
    setSecond(second);
    setInitialSecond(second);
    setStartTime(startMoment);
    e.preventDefault();
    // 休憩中の状態で開始したらそのまま
    if (
      workingStatus.nextAction === "work" ||
      workingStatus.nextAction === "ready"
    ) {
      setWorkingStatus({ nextAction: "work", isStart: true });
    } else {
      setWorkingStatus({ nextAction: "break", isStart: true });
    }
    setIsDisableButton(true);
    // setInterval内はsecond stateの変更を検知しない
    const id = setInterval(() => {
      setSecond(second - moment().diff(startMoment, "seconds"));
    }, 1000);
    setTimerId(id);
  };

  return (
    <div className="statusContainer">
      <div className="workingContent">
        <div className="statusText">{filterText(workingStatus.nextAction)}</div>
        <img
          className="statusImage"
          alt="Working status"
          src={filterImage(workingStatus.nextAction)}
        />
      </div>
      {/* workingStatusの値によって状態を変える */}
      {workingStatus.nextAction === "break" && (
        <div className="breakTimeSelectContainer">
          <button
            className={`tenMinuteBreak ${
              isDisableButton ? "disable" : "enable"
            }`}
            onClick={(e) => startTimer(10 * 60, e)}
            disabled={isDisableButton}
          >
            10分休憩する
          </button>
          <button
            className={`fiveMinuteBreak ${
              isDisableButton ? "disable" : "enable"
            }`}
            onClick={(e) => startTimer(5 * 60, e)}
            disabled={isDisableButton}
          >
            5分休憩する
          </button>
        </div>
      )}
      {workingStatus.nextAction === "work" && (
        <input
          className="workingContentInput"
          type="text"
          value={work}
          onChange={handleWorkChange}
          placeholder="今何をしていますか？"
        />
      )}
      {workingStatus.nextAction === "ready" && (
        <div className="workingSelectContainer">
          <button
            className="continueButton"
            onClick={(e) => startTimer(25 * 60, e)}
          >
            25分作業する
          </button>
          <button
            className="cancelButton"
            onClick={(e) => startTimer(60 * 60, e)}
          >
            60分作業する
          </button>
        </div>
      )}
    </div>
  );
};

export default Status;

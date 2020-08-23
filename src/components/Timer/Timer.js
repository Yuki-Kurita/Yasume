import React from "react";
import "./Timer.css";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import StopIcon from "@material-ui/icons/Stop";

const Timer = ({
  second,
  setSecond,
  timerId,
  setTimerId,
  setTimer,
  isDisableButton,
  setIsDisableButton,
}) => {
  const startTimer = (e) => {
    e.preventDefault();
    setTimer(1);
    setIsDisableButton(true);
    setTimerId(
      setInterval(() => {
        setSecond((second) => second - 1);
      }, 1000)
    );
  };

  const resetTimer = (e) => {
    e.preventDefault();
    setTimer(0);
    setIsDisableButton(false);
    clearInterval(timerId);
    setSecond(0);
  };

  // second -> hh:mm:ss形式に変更
  const formatTimer = (inputSecond) => {
    //時間計算
    const hour = Math.floor(inputSecond / 60 / 60);
    const min = Math.floor((inputSecond / 60) % 60);
    const sec = Math.floor(inputSecond % 60);
    let result = "";
    hour > 0
      ? hour >= 10
        ? (result += String(hour) + ":")
        : (result += "0" + String(hour) + ":")
      : (result += "00:");
    min > 0
      ? min >= 10
        ? (result += String(min) + ":")
        : (result += "0" + String(min) + ":")
      : (result += "00:");
    sec > 0
      ? sec >= 10
        ? (result += String(sec))
        : (result += "0" + String(sec))
      : (result += "00");
    return result;
  };

  return (
    <div className="timerContainer">
      <h3>
        <span role="img" aria-label="emoji">
          ⏱
        </span>
        Timer
      </h3>
      <div className="timerDisplay">{formatTimer(second)}</div>
      <div className="timerButton">
        <button
          onClick={(e) => setSecond((second) => second + 3600)}
          className={isDisableButton ? "disable" : "enable"}
          disabled={isDisableButton}
        >
          +1H
        </button>
        <button
          onClick={(e) => setSecond((second) => second + 600)}
          className={isDisableButton ? "disable" : "enable"}
          disabled={isDisableButton}
        >
          +10M
        </button>
        <button
          onClick={(e) => setSecond((second) => second + 60)}
          className={isDisableButton ? "disable" : "enable"}
          disabled={isDisableButton}
        >
          +1M
        </button>
        <button
          onClick={(e) => setSecond((second) => second + 10)}
          className={isDisableButton ? "disable" : "enable"}
          disabled={isDisableButton}
        >
          +10s
        </button>
        <button onClick={(e) => startTimer(e)}>
          <p className="startButton">
            <PlayCircleFilledIcon />
          </p>
        </button>
        <button onClick={(e) => resetTimer(e)}>
          <p className="stopButton">
            <StopIcon />
          </p>
        </button>
      </div>
    </div>
  );
};

export default Timer;

import React from "react";
import "./Timer.css";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import StopIcon from "@material-ui/icons/Stop";

const Timer = ({
  second,
  setSecond,
  initialSecond,
  setInitialSecond,
  timerId,
  setTimerId,
  workingStatus,
  setWorkingStatus,
  isDisableButton,
  setIsDisableButton,
  startTime,
  setStartTime,
  work,
  addWork,
}) => {
  const startTimer = (e) => {
    setInitialSecond(second);
    setStartTime(new Date());
    if (second <= 0) {
      return;
    }
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

  const resetTimer = (e) => {
    e.preventDefault();
    // 作業中(1)の状態で終了したら休憩(0)に移り、作業内容・時間を記録
    if (workingStatus === 1) {
      setWorkingStatus(0);
      addWork({
        content: work,
        time: initialSecond - second,
        startTime: startTime,
        endTime: new Date(),
      });
      // 休憩中(0)の状態で終了したら待機(2)に移る
    } else if (workingStatus === 0) {
      setWorkingStatus(2);
    }
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
        {workingStatus === 1 || workingStatus === 2
          ? "⏱ Work time"
          : "☕️ Break time"}
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
        <button
          onClick={(e) => startTimer(e)}
          className={isDisableButton ? "disable" : "enable"}
          disabled={isDisableButton}
        >
          <p className="startButton">
            <PlayCircleFilledIcon />
          </p>
        </button>
        <button
          onClick={(e) => resetTimer(e)}
          className={!isDisableButton ? "disable" : "enable"}
          disabled={!isDisableButton}
        >
          <p className="stopButton">
            <StopIcon />
          </p>
        </button>
      </div>
    </div>
  );
};

export default Timer;

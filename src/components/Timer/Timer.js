import React, { useState, useEffect } from "react";
import moment from "moment";
import "./Timer.css";
import useNotification from "../CustomHooks/useNotification";
import Status from "../Status/Status";
import Button from "./Button";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import StopIcon from "@material-ui/icons/Stop";

const Timer = ({ works, addWork, uid }) => {
  const [initialSecond, setInitialSecond] = useState(0);
  const [second, setSecond] = useState(0);
  const [timerId, setTimerId] = useState("");
  // 0: タイマー停止, 1: タイマー開始, 空: 準備中
  const [workingStatus, setWorkingStatus] = useState({
    nextAction: "ready",
    isStart: false,
  });
  // timerのボタンがdisabledか否か
  const [isDisableButton, setIsDisableButton] = useState(false);
  // 今してること
  const [work, setWork] = useState("");
  // 開始時間と終了時間
  const [startTime, setStartTime] = useState("");
  console.log(workingStatus);

  useNotification(workingStatus, second, timerId);

  useEffect(() => {
    // -秒になったら終了
    if (second < 0 && timerId) {
      const timerFinishedAction = () => {
        // 作業中(1)の状態で終了したら休憩(0)に移り、作業記録を保存
        if (workingStatus.nextAction === "work") {
          addWork({
            content: work,
            time: initialSecond - second,
            startTime: startTime.format("YYYY-MM-DD HH:mm:ss"),
            endTime: moment().format("YYYY-MM-DD HH:mm:ss"),
            uid: uid,
          });
          setWorkingStatus({ nextAction: "break", isStart: false });
          // 休憩中(0)の状態で終了したら待機(2)に移る
        } else if (workingStatus.nextAction === "break") {
          setWorkingStatus({ nextAction: "ready", isStart: false });
        }
      };

      clearInterval(timerId);
      timerFinishedAction();
      setSecond(0);
      setTimerId("");
      setIsDisableButton(false);
    }
  }, [
    addWork,
    initialSecond,
    second,
    startTime,
    timerId,
    uid,
    work,
    workingStatus,
  ]);

  const startTimer = (e) => {
    const startMoment = moment();
    setInitialSecond(second);
    setStartTime(startMoment);
    if (second <= 0) {
      return;
    }
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

  const resetTimer = (e) => {
    e.preventDefault();
    // 作業中の状態(次が休憩)で終了したら休憩(に移り、作業内容・時間を記録
    if (workingStatus.nextAction === "work") {
      setWorkingStatus({ nextAction: "break", isStart: false });
      addWork({
        content: work,
        time: initialSecond - second,
        startTime: startTime.format("YYYY-MM-DD HH:mm:ss"),
        endTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        uid: uid,
      });
      // 休憩中の状態(次が待機)で終了したら待機(終了状態)に移る
    } else if (workingStatus.nextAction === "break") {
      setWorkingStatus({ nextAction: "ready", isStart: false });
    }
    setIsDisableButton(false);
    clearInterval(timerId);
    setSecond(0);
  };

  // second -> HH:mm:ss形式に変更
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
    <>
      <div className="timerContainer">
        <h3>
          {workingStatus.nextAction === "work" ||
          workingStatus.nextAction === "ready"
            ? "⏱ Work time"
            : "☕️ Break time"}
        </h3>
        <div className="timerDisplay">{formatTimer(second)}</div>
        <div className="timerButton">
          <Button
            second={second}
            setSecond={setSecond}
            isDisableButton={isDisableButton}
          >
            1H
          </Button>
          <Button
            second={second}
            setSecond={setSecond}
            isDisableButton={isDisableButton}
          >
            10M
          </Button>
          <Button
            second={second}
            setSecond={setSecond}
            isDisableButton={isDisableButton}
          >
            1M
          </Button>
          <Button
            second={second}
            setSecond={setSecond}
            isDisableButton={isDisableButton}
          >
            10s
          </Button>
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
      <Status
        workingStatus={workingStatus}
        work={work}
        setWork={setWork}
        setSecond={setSecond}
        setInitialSecond={setInitialSecond}
        setWorkingStatus={setWorkingStatus}
        setIsDisableButton={setIsDisableButton}
        setTimerId={setTimerId}
        setStartTime={setStartTime}
        isDisableButton={isDisableButton}
      />
    </>
  );
};

export default Timer;

import React, { useState, useEffect } from "react";
import moment from "moment";
import "./Timer.css";
import Status from "../Status/Status";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import StopIcon from "@material-ui/icons/Stop";

const Timer = ({ works, addWork, uid }) => {
  const [initialSecond, setInitialSecond] = useState(0);
  const [second, setSecond] = useState(0);
  const [timerId, setTimerId] = useState("");
  // 0: タイマー停止, 1: タイマー開始, 空: 準備中
  const [workingStatus, setWorkingStatus] = useState(2);
  // timerのボタンがdisabledか否か
  const [isDisableButton, setIsDisableButton] = useState(false);
  // 今してること
  const [work, setWork] = useState("");
  // 開始時間と終了時間
  const [startTime, setStartTime] = useState("");

  useEffect(() => {
    // Notification APIに対応しているか
    if (!("Notification" in window)) {
      console.log("this browser does not support notification");
    } else {
      // Notification.requestPermission()のプロミス版に対応しているか確認
      if (checkNotificationPromise()) {
        Notification.requestPermission().then((permission) => {
          handlePermission(permission);
        });
      } else {
        Notification.requestPermission(function (permission) {
          handlePermission(permission);
        });
      }
    }
  }, []);

  useEffect(() => {
    // -秒になったら終了
    if (second < 0 && timerId) {
      clearInterval(timerId);
      // 作業中(1)の状態で終了したら休憩(0)に移り、作業記録を保存
      if (workingStatus === 1) {
        addWork({
          content: work,
          time: initialSecond - second,
          startTime: startTime.format("YYYY-MM-DD HH:mm:ss"),
          endTime: moment().format("YYYY-MM-DD HH:mm:ss"),
          uid: uid,
        });
        setWorkingStatus(0);
        // デスクトップ通知
        if (window.Notification && Notification.permission === "granted") {
          new Notification("Yasume", {
            icon: "../../icnos/notification.png",
            body: "お疲れまでした！休憩を取ってください！",
          });
        }
        // 休憩中(0)の状態で終了したら待機(2)に移る
      } else if (workingStatus === 0) {
        setWorkingStatus(2);
        if (window.Notification && Notification.permission === "granted") {
          new Notification("Yasume", {
            icon: "../../icnos/notification.png",
            body: "休憩時間が終わりました！準備ができたら作業を始めましょう！",
          });
        }
      }
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

  // Notification APIがPromiseに対応してるか確認する
  const checkNotificationPromise = () => {
    try {
      Notification.requestPermission().then();
    } catch (e) {
      return false;
    }

    return true;
  };

  // 通知の許可を求める関数
  const handlePermission = (permission) => {
    // Whatever the user answers, we make sure Chrome stores the information
    if (!("permission" in Notification)) {
      Notification.permission = permission;
    }
  };

  const startTimer = (e) => {
    const startMoment = moment();
    setInitialSecond(second);
    setStartTime(startMoment);
    if (second <= 0) {
      return;
    }
    e.preventDefault();
    // 休憩中(0)の状態で開始したら0のまま
    if (workingStatus === 1 || workingStatus === 2) {
      setWorkingStatus(1);
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
    // 作業中(1)の状態で終了したら休憩(0)に移り、作業内容・時間を記録
    if (workingStatus === 1) {
      setWorkingStatus(0);
      addWork({
        content: work,
        time: initialSecond - second,
        startTime: startTime.format("YYYY-MM-DD HH:mm:ss"),
        endTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        uid: uid,
      });
      // 休憩中(0)の状態で終了したら待機(2)に移る
    } else if (workingStatus === 0) {
      setWorkingStatus(2);
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

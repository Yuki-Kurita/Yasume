import React, { useState, useEffect } from "react";
import moment from "moment";
import Timer from "../Timer/Container/Timer";
import Today from "../Today/Container/Today";
import Status from "../Status/Status";
import Navbar from "../Navbar/Navbar";
import "./SingleRoom.css";
import Grid from "@material-ui/core/Grid";

const SingleRoom = ({ works, addWork, uid }) => {
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
          startTime: startTime,
          endTime: moment().format("YYYY-MM-DD hh:mm:ss"),
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

  return (
    <>
      <Navbar isTimer={true} />
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <div className="leftContainer">
            <Timer
              second={second}
              setSecond={setSecond}
              initialSecond={initialSecond}
              setInitialSecond={setInitialSecond}
              timerId={timerId}
              setTimerId={setTimerId}
              workingStatus={workingStatus}
              setWorkingStatus={setWorkingStatus}
              isDisableButton={isDisableButton}
              setIsDisableButton={setIsDisableButton}
              startTime={startTime}
              setStartTime={setStartTime}
              work={work}
            />
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
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Today />
        </Grid>
      </Grid>
    </>
  );
};

export default SingleRoom;

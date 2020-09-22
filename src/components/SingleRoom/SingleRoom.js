import React, { useState, useEffect } from "react";
import Timer from "../Timer/Container/Timer";
import Today from "../Today/Container/Today";
import Status from "../Status/Status";
import Navbar from "../Navbar/Navbar";
import "./SingleRoom.css";
import Grid from "@material-ui/core/Grid";

const SingleRoom = ({ works, addWork }) => {
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
    // -秒になったら終了
    if (second < 0 && timerId) {
      clearInterval(timerId);
      // 作業中(1)の状態で終了したら休憩(0)に移り、作業記録を保存
      if (workingStatus === 1) {
        addWork({
          content: work,
          time: initialSecond - second,
          startTime: startTime,
          endTime: new Date(),
        });
        setWorkingStatus(0);
        // 休憩中(0)の状態で終了したら待機(2)に移る
      } else if (workingStatus === 0) {
        setWorkingStatus(2);
      }
      setSecond(0);
      setTimerId("");
      setIsDisableButton(false);
    }
  }, [addWork, initialSecond, second, startTime, timerId, work, workingStatus]);

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
              isDisableButton={isDisableButton}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className="rightContainer">
            <Today />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default SingleRoom;

import React, { useState, useEffect } from "react";
import Timer from "../Timer/Timer";
import Status from "../Status/Status";
import Navbar from "../Navbar/Navbar";
import "./SingleRoom.css";
import Grid from "@material-ui/core/Grid";

const SingleRoom = ({ location }) => {
  const [second, setSecond] = useState(25 * 60);
  const [timerId, setTimerId] = useState("");
  // 0: タイマー停止, 1: タイマー開始, 空: 準備中
  const [workingStatus, setWorkingStatus] = useState(2);
  // timerのボタンがdisabledか否か
  const [isDisableButton, setIsDisableButton] = useState(false);
  // 今してること
  const [work, setWork] = useState("");

  useEffect(() => {
    // -秒になったら終了
    if (second < 0 && timerId) {
      clearInterval(timerId);
      // 作業中(1)の状態で終了したら休憩(0)に移る
      if (workingStatus === 1) {
        setWorkingStatus(0);
        // 休憩中(0)の状態で終了したら待機(2)に移る
      } else if (workingStatus === 0) {
        setWorkingStatus(2);
      }
      setSecond(0);
      setTimerId("");
      setIsDisableButton(false);
    }
  }, [second, timerId, workingStatus]);

  return (
    <>
      <Navbar isTimer={true} />
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <div className="leftContainer">
            <Timer
              second={second}
              setSecond={setSecond}
              timerId={timerId}
              setTimerId={setTimerId}
              workingStatus={workingStatus}
              setWorkingStatus={setWorkingStatus}
              isDisableButton={isDisableButton}
              setIsDisableButton={setIsDisableButton}
            />
            <Status
              workingStatus={workingStatus}
              work={work}
              setWork={setWork}
              setSecond={setSecond}
              setWorkingStatus={setWorkingStatus}
              setIsDisableButton={setIsDisableButton}
              setTimerId={setTimerId}
              isDisableButton={isDisableButton}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className="rightContainer">dashBoard的な{work}</div>
        </Grid>
      </Grid>
    </>
  );
};

export default SingleRoom;

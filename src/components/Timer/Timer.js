import React, { useState, useEffect } from "react";
import "./Timer.css";

const Timer = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [timerId, setTimerId] = useState("");

  useEffect(() => {
    if (second > 60) {
      setMinute(minute + 1);
      setSecond(0);
    } else if (second < 0) {
      setMinute(minute - 1);
      setSecond(59);
    }
    if (minute > 60) {
      setHour(hour + 1);
      setMinute(0);
    } else if (minute < 0) {
      setHour(hour - 1);
      setMinute(59);
    }
    if (hour < 0) {
      setHour(0);
      setMinute(0);
      setSecond(0);
      clearInterval(timerId);
      console.log("clear interval");
    }
  }, [second, minute, hour, timerId]);

  const startTimer = (e) => {
    e.preventDefault();
    setTimerId(
      setInterval(() => {
        setSecond((second) => second - 1);
      }, 1000)
    );
  };

  const resetTimer = (e) => {
    e.preventDefault();
    clearInterval(timerId);
    setHour(0);
    setMinute(0);
    setSecond(0);
  };

  const zeroFormat = (num) => {
    return String(num).length === 1 ? "0" + String(num) : String(num);
  };

  return (
    <div className="timerContainer">
      <h3>
        <span role="img" aria-label="emoji">
          ⏱
        </span>
        timer
      </h3>
      <div className="timerDisplay">
        {hour}:{zeroFormat(minute)}:{zeroFormat(second)}
      </div>
      <button onClick={(e) => setHour(1 + hour)}>+1H</button>
      <button onClick={(e) => setMinute(10 + minute)}>+10M</button>
      <button onClick={(e) => setMinute(1 + minute)}>+1M</button>
      <button onClick={(e) => setSecond(10 + second)}>+10s</button>
      <button onClick={(e) => startTimer(e)}>start</button>
      <button onClick={(e) => resetTimer(e)}>reset</button>
    </div>
  );
};

export default Timer;

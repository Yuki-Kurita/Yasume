import React, { useState, useEffect } from "react";
import queryString from "query-string";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
import Timer from "../Timer/Timer";
import Status from "../Status/Status";
import "./SingleRoom.css";
import Grid from "@material-ui/core/Grid";
import useReactRouter from "use-react-router";

let socket;

const SingleRoom = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [second, setSecond] = useState(0);
  const [timerId, setTimerId] = useState("");
  // 0: タイマー停止, 1: タイマー開始, 空: 準備中
  const [timer, setTimer] = useState(2);
  // timerのボタンがdisabledか否か
  const [isDisableButton, setIsDisableButton] = useState(false);
  const { history } = useReactRouter();

  useEffect(() => {
    // -秒になったら終了
    console.log(timerId);
    if (second === 0 && timerId) {
      clearInterval(timerId);
      console.log("-秒");
      setTimer(0);
      setSecond(0);
      setTimerId("");
    }
  }, [second, timerId]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <>
      <InfoBar room={room} />
      <Grid container>
        <Grid item xs={12} sm={12} md={7}>
          <div className="leftContainer">
            <TextContainer users={users} />
            <Timer
              second={second}
              setSecond={setSecond}
              timerId={timerId}
              setTimerId={setTimerId}
              setTimer={setTimer}
              isDisableButton={isDisableButton}
              setIsDisableButton={setIsDisableButton}
            />
            <Status timer={timer} />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default SingleRoom;

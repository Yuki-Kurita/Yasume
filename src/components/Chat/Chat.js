import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
import Timer from "../Timer/Timer";
import Status from "../Status/Status";
import "./Chat.css";
import Grid from "@material-ui/core/Grid";
import useReactRouter from "use-react-router";

let socket;

const Chat = ({ location }) => {
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

  const ENDPOINT = process.env.ENDPOINT || "localhost:5000";
  console.log(process.env);
  console.log(process.env.ENDPOINT);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    // URLから名前、部屋名を入力された時の対策
    if (name.length > 10 || room.length > 10) {
      history.push({
        pathname: "/",
      });
    } else {
      setName(name);
      setRoom(room);
    }

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search, history]);

  // mount時とmessagesに変化があった時のみ実行
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

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
    // server側にタイマーの設定を送信
    socket.emit("sendTimer", { second: second });
    socket.on("timer", (timer) => {
      setSecond(timer.second);
    });
  }, [second, timerId]);

  // 稼働中かどうかを送信
  useEffect(() => {
    socket.emit("sendWorkingStatus", timer);
    socket.on("status", (status) => {
      setTimer(status);
    });
  }, [timer]);

  // buttonのdisabled状態を送信
  useEffect(() => {
    socket.emit("sendDisabledButton", isDisableButton);
    socket.on("disabledButton", (disabledButton) => {
      setIsDisableButton(disabledButton);
    });
  }, [isDisableButton]);

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
        <Grid item xs={12} sm={12} md={5}>
          <div className="rightContainer">
            <Messages messages={messages} name={name} />
            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;

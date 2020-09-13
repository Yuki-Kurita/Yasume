import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Step from "../Step/Step";
import "./Join.css";
import Grid from "@material-ui/core/Grid";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import workspaceIcon from "../../icons/workspace.svg";
import timerIcon from "../../icons/timer.svg";
import chatIcon from "../../icons/chat.svg";
import stopwatchIcon from "../../icons/stopwatch.svg";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [errorNameMessage, setErrorNameMessage] = useState("");
  const [errorRoomMessage, setErrorRoomMessage] = useState("");

  const filterName = (e) => {
    if (e.target.value.length <= 10) {
      setErrorNameMessage("");
      setName(e.target.value);
    } else {
      setErrorNameMessage("ユーザ名は10文字以内で入力してください");
    }
  };

  const filterRoom = (e) => {
    if (e.target.value.length <= 10) {
      setErrorRoomMessage("");
      setRoom(e.target.value);
    } else {
      setErrorRoomMessage("ルーム名は10文字以内で入力してください");
    }
  };

  return (
    <>
      <Header />
      <Grid container>
        <Grid item xs={12} sm={6} md={6}>
          <div className="stepContainer">
            <Step
              className="step"
              image={workspaceIcon}
              no={1}
              explain="好きな名前と、部屋名を入力し、「参加する」を押してください。チームメンバーと同じ部屋名を入力すると一緒の部屋に入れます！"
            />
            <Step
              className="step"
              image={timerIcon}
              no={2}
              explain="タイマー機能を利用し、定期的に休憩を取ってください。時間は部屋内のメンバーに共有されます。"
            />
            <Step
              className="step"
              image={chatIcon}
              no={3}
              explain="メッセージ機能を有効活用してチームメンバーとコミュニケーションを図ってください。"
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <div className="joinOuterContainer">
            <div className="joinInnerContainer">
              <h2>1人で始める</h2>
              <Link to="/singleRoom">
                <button className="singleJoinButton">
                  <img
                    className="stopwatchIcon"
                    src={stopwatchIcon}
                    alt="timer"
                  />
                  Go to App
                </button>
              </Link>
            </div>
            <div className="joinInnerContainer">
              <h1 className="heading">
                <span className="icon">
                  <MeetingRoomIcon fontSize="large" />
                </span>
                部屋を探す
              </h1>
              <div>
                <label>
                  <div className="nameLabel">User Name</div>
                  <input
                    placeholder="Name"
                    className="joinInput"
                    type="text"
                    onChange={(e) => filterName(e)}
                  />
                </label>
              </div>
              {errorNameMessage && (
                <div className="errorNameMessage">{errorNameMessage}</div>
              )}
              <div>
                <label>
                  <div className="roomLabel">Room Name</div>
                  <input
                    placeholder="Room"
                    className="joinInput"
                    type="text"
                    onChange={(e) => filterRoom(e)}
                  />
                </label>
              </div>
              {errorRoomMessage && (
                <div className="errorRoomMessage">{errorRoomMessage}</div>
              )}
              <Link
                onClick={(event) =>
                  !name || !room ? event.preventDefault() : null
                }
                to={`/chat?name=${name}&room=${room}`}
              >
                <button className="button mt-20" type="submit">
                  参加する
                  <span className="icon">
                    <EmojiPeopleIcon />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Join;

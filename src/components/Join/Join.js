import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Join.css";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [errorNameMessage, setErrorNameMessage] = useState("");
  const [errorRoomMessage, setErrorRoomMessage] = useState("");

  let errorQueryMessage = null;

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
      <div className="joinOuterContainer">
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
    </>
  );
};

export default Join;

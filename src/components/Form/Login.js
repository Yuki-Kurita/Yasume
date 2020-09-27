import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import "./style.scss";
import CancelIcon from "@material-ui/icons/Cancel";
import loginIcon from "../../icons/login.svg";

const Login = ({ history, setIsDisplay, login, authError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState("");

  const handleSubmit = (history, event) => {
    event.preventDefault();
    if (!email) {
      setInputError("メールアドレスを入力してください");
    } else if (!password) {
      setInputError("パスワードを入力してください");
    } else if (password.length < 8) {
      setInputError("パスワードは8文字以上で入力してください");
    } else {
      setInputError("");
      login({ email: email, password: password });
      // click領域を切り替えるstateを更新したい
    }
  };

  useEffect(() => {
    !authError && history.push({ pathname: "/singleRoom" });
  }, [authError, history]);

  return (
    <>
      <div className="formOuterContainer" onClick={() => setIsDisplay(false)} />
      <div className="formContainer">
        <button className="closeButton" onClick={() => setIsDisplay(false)}>
          <CancelIcon />
        </button>
        <form className="formBox">
          <h3>Login</h3>
          <img className="formImage" src={loginIcon} alt="login" />
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="login-input"
              placeholder="Username"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button
            type="submit"
            className="submitButton"
            onClick={(e) => handleSubmit(history, e)}
          >
            Login
          </button>
          {inputError && <div className="errorMessage">{inputError}</div>}
          {authError && <div className="errorMessage">{authError}</div>}
        </form>
      </div>
    </>
  );
};

export default withRouter(Login);

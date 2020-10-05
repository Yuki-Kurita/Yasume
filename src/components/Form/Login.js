import React, { useState } from "react";
import { withRouter } from "react-router";
import "./style.scss";
import CancelIcon from "@material-ui/icons/Cancel";
import loginIcon from "../../icons/login.svg";

const Login = ({ history, login, setForm, user }) => {
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
      setForm({ isLoginForm: true, isDisplay: false });
      history.push({ pathname: "/singleRoom" });
    }
  };

  return (
    <>
      <div
        className="formOuterContainer"
        onClick={() => setForm({ isLoginForm: true, isDisplay: false })}
      />
      <div className="formContainer">
        <button
          className="closeButton"
          onClick={() => setForm({ isLoginForm: true, isDisplay: false })}
        >
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
          {user.authError && (
            <div className="errorMessage">{user.authError}</div>
          )}
        </form>
      </div>
    </>
  );
};

export default withRouter(Login);

import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { withRouter } from "react-router";
import "./style.scss";
import CancelIcon from "@material-ui/icons/Cancel";
import loginIcon from "../../icons/login.svg";

const Login = ({ history, setIsDisplay }) => {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (history, event) => {
    event.preventDefault();
    loginUser(email, password, history);
  };

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
        </form>
      </div>
    </>
  );
};

export default withRouter(Login);

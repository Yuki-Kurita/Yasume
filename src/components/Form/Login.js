import React, { useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import { withRouter } from "react-router";
import "./style.scss";
import CancelIcon from "@material-ui/icons/Cancel";
import loginIcon from "../../icons/login.svg";

const Login = ({ history, setIsDisplay }) => {
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    loginUser(email.value, password.value, history);
  };

  return (
    <>
      <div className="formOuterContainer" onClick={() => setIsDisplay(false)} />
      <div className="formContainer">
        <button className="closeButton" onClick={() => setIsDisplay(false)}>
          <CancelIcon />
        </button>
        <form className="formBox" onSubmit={handleSubmit}>
          <h3>Login</h3>
          <img className="formImage" src={loginIcon} alt="login" />
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="login-input"
              placeholder="Username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="submitButton">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default withRouter(Login);

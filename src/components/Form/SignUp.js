import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { withRouter } from "react-router";
import "./style.scss";
import CancelIcon from "@material-ui/icons/Cancel";
import signUpIcon from "../../icons/signup.svg";

const SignUp = ({ history, setIsDisplay }) => {
  const { signUpUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (history, event) => {
    event.preventDefault();
    signUpUser(email, password, history);
  };

  return (
    <>
      <div className="formOuterContainer" onClick={() => setIsDisplay(false)} />
      <div className="formContainer">
        <button className="closeButton" onClick={() => setIsDisplay(false)}>
          <CancelIcon />
        </button>
        <form className="formBox">
          <h3>Sign up</h3>
          <img className="formImage" src={signUpIcon} alt="signup" />
          <div className="input-group">
            <label htmlFor="signUpEmail">Email</label>
            <input
              type="text"
              name="signUpEmail"
              className="login-input"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="signUpPassword">Password</label>
            <input
              type="password"
              name="signUpPassword"
              className="login-input"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button
            type="button"
            className="submitButton"
            onClick={(e) => handleSubmit(history, e)}
          >
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default withRouter(SignUp);

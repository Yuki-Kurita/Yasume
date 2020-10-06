import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Login from "../Form/Container/Login";
import SignUp from "../Form/Container/SignUp";
import useReactRouter from "use-react-router";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 22px 10px;
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    text-align: left;
  }
  @media (max-width: 960px) {
    flex-flow: column nowrap;
    background-color: #4e5050;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
  }
`;

const RightNav = ({
  open,
  logout,
  isLogin,
  isLoginForm,
  isDisplay,
  setForm,
}) => {
  const { history } = useReactRouter();

  const handleForm = (selectedActivitiy, e) => {
    if (selectedActivitiy === "logout") {
      logout();
      setForm({ isLoginForm: true, isDisplay: false });
      history.push({
        pathname: "/",
      });
    } else if (selectedActivitiy === "login") {
      setForm({ isLoginForm: true, isDisplay: true });
    } else {
      setForm({ isLoginForm: false, isDisplay: true });
    }
  };

  return (
    <>
      <Ul open={open}>
        <Link to="/singleRoom">
          <li>Go to app</li>
        </Link>
        {!isLogin ? (
          <>
            <button onClick={(e) => handleForm("login", e)}>
              <li>Login</li>
            </button>
            <button onClick={(e) => handleForm("signUp", e)}>
              <li>Sign Up</li>
            </button>
          </>
        ) : (
          <>
            <li>アカウント</li>
            <button onClick={(e) => handleForm("logout", e)}>
              <li>Logout</li>
            </button>
          </>
        )}
      </Ul>
      {isDisplay && (isLoginForm ? <Login /> : <SignUp />)}
    </>
  );
};

export default RightNav;

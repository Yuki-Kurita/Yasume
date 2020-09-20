import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FormBox from "../Form/FormBox";

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

const RightNav = ({ open }) => {
  const [isDisplay, setIsDisplay] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(false);

  const handleForm = (selectedActivitiy, e) => {
    setIsDisplay(true);
    selectedActivitiy === "login"
      ? setIsLoginForm(true)
      : setIsLoginForm(false);
  };

  return (
    <>
      <Ul open={open}>
        <Link to="/singleRoom">
          <li>一人で始める</li>
        </Link>
        <a href="#team">
          <li>みんなで始める</li>
        </a>
        <button onClick={(e) => handleForm("login", e)}>
          <li>Login</li>
        </button>
        <button onClick={(e) => handleForm("signUp", e)}>
          <li>Sign Up</li>
        </button>
      </Ul>
      <FormBox
        isDisplay={isDisplay}
        setIsDisplay={setIsDisplay}
        isLoginForm={isLoginForm}
      />
    </>
  );
};

export default RightNav;

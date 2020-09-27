import React from "react";
import Login from "./Container/Login";
import SignUp from "./Container/SignUp";

const FormBox = ({ setIsDisplay, isLoginForm }) => {
  return (
    <>
      <>
        {isLoginForm ? (
          <Login setIsDisplay={setIsDisplay} />
        ) : (
          <SignUp setIsDisplay={setIsDisplay} />
        )}
      </>
    </>
  );
};

export default FormBox;

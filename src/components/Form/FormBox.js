import React from "react";
import Login from "./Container/Login";
import SignUp from "./Container/SignUp";

const FormBox = ({ isDisplay, setIsDisplay, isLoginForm }) => {
  return (
    <>
      {isDisplay && (
        <>
          {isLoginForm ? (
            <Login setIsDisplay={setIsDisplay} />
          ) : (
            <SignUp setIsDisplay={setIsDisplay} />
          )}
        </>
      )}
    </>
  );
};

export default FormBox;

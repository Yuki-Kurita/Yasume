import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";

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

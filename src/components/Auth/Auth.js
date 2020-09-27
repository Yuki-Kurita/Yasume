import React, { useEffect } from "react";

const Auth = ({ children, changeStatus }) => {
  useEffect(() => {
    console.log("change status");
    changeStatus();
  });

  return <>{children}</>;
};

export default Auth;

import React, { useEffect } from "react";

const Auth = ({ children, changeStatus }) => {
  useEffect(() => {
    changeStatus();
  });

  return <>{children}</>;
};

export default Auth;

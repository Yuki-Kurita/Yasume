import React, { useState } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";

// contextの作成
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  });

  const [currentUser, setCurrentUser] = useState(null);

  // // ユーザをログインさせる関数
  const loginUser = async (email, password, history) => {
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      history.push("/singleRoom");
    } catch (error) {
      alert(error.message);
    }
  };

  // // ユーザを新規登録させる
  const signUpUser = async (email, password, history) => {
    console.log("signup");
    try {
      await app.auth().createUserWithEmailAndPassword(email, password);
      history.push("/singleRoom");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loginUser: loginUser,
        signUpUser: signUpUser,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

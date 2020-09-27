export const login = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((user) => {
        dispatch({ type: "LOGIN_SUCCESS", uid: user.uid });
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_ERROR", error: error.message });
      });
  };
};

export const signUp = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((user) => {
        dispatch({ type: "SIGNUP_SUCCESS", uid: user.uid });
      })
      .catch((error) => {
        dispatch({ type: "SIGNUP_ERROR", error: error.message });
      });
  };
};

export const logout = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "LOGOUT_SUCCESS" });
      });
  };
};

export const changeStatus = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().onAuthStateChanged((user) => {
      user
        ? dispatch({ type: "IS_LOGIN", uid: user.uid })
        : dispatch({ type: "NOT_LOGIN" });
    });
  };
};

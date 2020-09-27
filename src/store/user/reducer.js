const initState = {
  authError: true,
};

const user = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: false,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: action.error,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        authError: false,
      };
    case "SIGNUP_ERROR":
      return {
        ...state,
        authError: action.error,
      };
    default:
      return state;
  }
};

export default user;

const initState = {
  authError: true,
  isLogin: false,
};

const user = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: false,
        isLogin: true,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: action.error,
        isLogin: false,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        authError: false,
        isLogin: true,
      };
    case "SIGNUP_ERROR":
      return {
        ...state,
        authError: action.error,
        isLogin: false,
      };
    case "LOGOUT_SUCCESSS":
      return {
        ...state,
        isLogin: false,
      };
    case "IS_LOGIN":
      return {
        ...state,
        isLogin: true,
      };
    case "NOT_LOGIN":
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
};

export default user;

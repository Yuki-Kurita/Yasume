const initState = {
  isLoginForm: true,
  isDisplay: false,
};

const form = (state = initState, action) => {
  switch (action.type) {
    case "SET_FORM":
      return {
        isLoginForm: action.isLoginForm,
        isDisplay: action.isDisplay,
      };
    default:
      return state;
  }
};

export default form;

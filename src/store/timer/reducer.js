const timer = (state = "", action) => {
  switch (action.type) {
    case "SET_TIME":
      return {
        startTime: action.startTime,
        endTime: action.endTime,
      };
    default:
      return state;
  }
};

export default timer;

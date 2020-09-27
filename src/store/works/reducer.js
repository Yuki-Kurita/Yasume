const works = (state = [], action) => {
  switch (action.type) {
    case "ADD_WORK":
      return [
        ...state,
        {
          content: action.content,
          time: action.time,
          startTime: action.startTime,
          endTime: action.endTime,
        },
      ];
    default:
      return state;
  }
};

export default works;

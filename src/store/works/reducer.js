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
          uid: action.uid,
        },
      ];
    case "ADD_WORK_ERROR":
      // TODO: ERROR処理
      console.log(action.error);
      return state;
    case "FETCH_WORK":
      return [...action.works];
    case "FETCH_WORK_ERROR":
      // TODO: ERROR処理
      console.log(action.error);
      return state;
    default:
      return state;
  }
};

export default works;

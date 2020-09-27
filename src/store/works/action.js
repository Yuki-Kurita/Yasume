// 作業内容・時間を保存
export const addWork = (work) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const action = {
      type: "ADD_WORK",
      content: work.content,
      time: work.time,
      startTime: work.startTime,
      endTime: work.endTime,
      uid: work.uid,
    };

    work.uid
      ? firestore
          .collection("works")
          .add({
            content: work.content,
            time: work.time,
            startTime: work.startTime,
            endTime: work.endTime,
            uid: work.uid,
          })
          .then(() => {
            dispatch(action);
          })
          .catch((error) => {
            dispatch({ type: "ADD_WORK_ERROR", error });
          })
      : dispatch(action);
  };
};

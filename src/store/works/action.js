// 作業内容・時間を保存
export const addWork = (work) => {
  return (dispatch, getState, { getFirestore }) => {
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

export const fetchWork = (uid) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let works = [];
    firestore
      .collection("works")
      .where("uid", "==", uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          works.push(doc.data());
        });
        dispatch({ type: "FETCH_WORK", works });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_WORK_ERROR", error });
      });
  };
};

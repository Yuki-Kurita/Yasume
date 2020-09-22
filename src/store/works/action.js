// 作業内容・時間を保存
export const addWork = (work) => ({
  type: "ADD_WORK",
  content: work.content,
  time: work.time,
  startTime: work.startTime,
  endTime: work.endTime,
});

// 作業履歴を取得
export const fetchWork = (work) => ({
  type: "GET_WORK",
});

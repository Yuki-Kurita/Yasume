// 作業開始時間・終了時間を設定
export const setTime = (time) => ({
  type: "SET_TIME",
  startTime: time.startTime,
  endTime: time.endTime,
});

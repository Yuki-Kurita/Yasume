// 作業内容・時間を保存
export const addWork = (work) => ({
  type: "ADD_WORK",
  content: work.content,
  time: work.time,
});

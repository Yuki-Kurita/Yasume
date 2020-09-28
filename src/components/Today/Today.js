import React, { useState, useEffect } from "react";
import moment from "moment";
import "./Today.scss";

const Today = ({ works, user, fetchWork }) => {
  const [sortWorks, setSortWorks] = useState(works);

  useEffect(() => {
    user.uid && fetchWork(user.uid);
  }, [fetchWork, user]);

  // 日付順に作業をsort
  useEffect(() => {
    setSortWorks(
      works
        .sort((bef, aft) => {
          return bef.endTime < aft.endTime ? -1 : 1;
        })
        .reverse()
    );
  }, [works, sortWorks]);

  const timeToDisplay = (startTime, endTime) => {
    return startTime.split(" ")[1] + " - " + endTime.split(" ")[1];
  };

  const totalTimeToDisplay = (seconds) => {
    const hour = (seconds / 3600) | 0;
    const minute = ((seconds % 3600) / 60) | 0;
    const second = seconds % 60;
    const timestamp = moment({ second: second, minute: minute, hour: hour });
    return timestamp.format("HH:mm:ss");
  };

  return (
    <>
      <h3>
        <span role="img" aria-label="Man Technologist">
          👨‍💻
        </span>
        Today
      </h3>
      {!user.isLogin && (
        <div className="signInRecommend">
          ログインすると作業履歴を保存できます!
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th className="workContent">Work</th>
            <th className="workTime">Time</th>
            <th className="totalTime">Total</th>
          </tr>
        </thead>
        <tbody>
          {sortWorks.map((work, i) => {
            return (
              <tr key={i}>
                <td className="workContent">{work.content}</td>
                <td className="workTime">
                  {timeToDisplay(work.startTime, work.endTime)}
                </td>
                <td className="totalTime">{totalTimeToDisplay(work.time)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Today;

import React, { useState, useEffect } from "react";
import { Element, Link } from "react-scroll";
import moment from "moment";
import "./Today.scss";
import arrowIcon from "../../icons/up-arrow.svg";

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

  const dayToDisplay = (index) => {
    if (index === 0) return sortWorks[index].startTime.split(" ")[0];
    return sortWorks[index].startTime.split(" ")[0] ===
      sortWorks[index - 1].startTime.split(" ")[0]
      ? false
      : sortWorks[index].startTime.split(" ")[0];
  };

  return (
    <Element
      name="rightContainer"
      id="containerElement"
      className="rightContainer"
    >
      <Element name="top">
        <h3>
          <span role="img" aria-label="Man Technologist">
            👨‍💻
          </span>
          Today
        </h3>
      </Element>
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
              <>
                {dayToDisplay(i) && (
                  <tr key={dayToDisplay(i)}>
                    <td className="workDay" colSpan="3">
                      {dayToDisplay(i)}
                    </td>
                  </tr>
                )}
                <tr key={i}>
                  <td className="workContent">{work.content}</td>
                  <td className="workTime">
                    {timeToDisplay(work.startTime, work.endTime)}
                  </td>
                  <td className="totalTime">{totalTimeToDisplay(work.time)}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <Link
        activeClass="active"
        to="top"
        spy={true}
        smooth={true}
        containerId="containerElement"
        className="scrollButton"
        duration={250}
      >
        <img className="upperArrow" src={arrowIcon} alt="arrow" />
      </Link>
    </Element>
  );
};

export default Today;

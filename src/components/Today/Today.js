import React from "react";
import moment from "moment";
import "./Today.scss";

const Today = ({ works }) => {
  const timeToDisplay = (startTime, endTime) => {
    const formatStyle = "HH:mm:ss";
    return startTime.format(formatStyle) + " - " + endTime.format(formatStyle);
  };

  const totalTimeToDisplay = (seconds) => {
    const formatStyle = "HH:mm:ss";
    const timestamp = moment({ second: seconds });
    return timestamp.format(formatStyle);
  };

  return (
    <>
      <h3>
        <span role="img" aria-label="Man Technologist">
          👨‍💻
        </span>
        Today
      </h3>
      <table>
        <thead>
          <tr>
            <th className="workContent">Work</th>
            <th className="workTime">Time</th>
            <th className="totalTime">Total</th>
          </tr>
        </thead>
        <tbody>
          {works.map((work, i) => {
            return (
              <tr>
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

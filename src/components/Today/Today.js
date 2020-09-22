import React from "react";

const Today = ({ works }) => {
  const timeToDisplay = (startTime, endTime) => {
    const start =
      zeroFormat(startTime.getHours()) +
      ":" +
      zeroFormat(startTime.getMinutes()) +
      " " +
      filterAMOrPM(startTime.getHours);
    const end =
      zeroFormat(endTime.getHours()) +
      ":" +
      zeroFormat(endTime.getMinutes()) +
      " " +
      filterAMOrPM(endTime.getHours);
    return start + " - " + end;
  };

  const filterAMOrPM = (hour) => {
    return hour >= 12 ? "PM" : "AM";
  };

  const zeroFormat = (time) => {
    return time < 10 ? "0" + time : time;
  };

  const totalTimeToDisplay = (seconds) => {
    const hour = zeroFormat((seconds / 3600) | 0);
    const minute = zeroFormat(((seconds % 3600) / 60) | 0);
    const second = zeroFormat(seconds % 60);
    return hour + ":" + minute + ":" + second;
  };

  return (
    <>
      <h3>
        <span role="img" aria-label="Man Technologist">
          👨‍💻
        </span>
        Today
      </h3>
      <ul>
        {works.map((work, i) => {
          return (
            <li key={i}>
              <span className="workContent">{work.content}</span>
              <span className="workDateTime">
                {timeToDisplay(work.startTime, work.endTime)}
              </span>
              <span className="workTime">{totalTimeToDisplay(work.time)}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Today;

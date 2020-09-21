import React from "react";

const Dashboard = ({ works }) => {
  console.log(works["works"]);
  return (
    <ul>
      {works["works"].map((work, i) => {
        return <li key={i}>{work.content}</li>;
      })}
    </ul>
  );
};

export default Dashboard;

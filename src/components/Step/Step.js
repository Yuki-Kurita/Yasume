import React from "react";
import "./Step.css";

const Step = ({ image, no, explain }) => {
  return (
    <div className="step">
      <h3>STEP{no}</h3>
      <div className="stepDetail">
        <img className="stepImage" src={image} alt={`step${no}`} />
        <div className="stepExplain">{explain}</div>
      </div>
    </div>
  );
};

export default Step;

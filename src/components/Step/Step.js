import React from "react";
import "./Step.css";

const Step = ({ image, no, explain }) => {
  return (
    <div className="step">
      <h3>STEP{no}</h3>
      <div className="stepDetail">
        <img className="stepImage" src={image} alt={`step${no}`} />
        <span className="stepExplain">{explain}</span>
      </div>
    </div>
  );
};

export default Step;

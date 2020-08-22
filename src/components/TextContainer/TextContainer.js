import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import "./TextContainer.css";

const TextContainer = ({ users }) => (
  <div className="textContainer">
    {users ? (
      <div className="loginUserContainer">
        <h3>
          <span role="img" aria-label="emoji">
            👤
          </span>
          入室者
        </h3>
        <div className="activeContainer">
          {users.map(({ name }) => (
            <div key={name} className="activeItem">
              {name}
              <img alt="Online Icon" src={onlineIcon} />
            </div>
          ))}
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;

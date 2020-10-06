import React from "react";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import coffeeBreakImage from "../../icons/coffee_break.svg";

const Header = () => (
  <div className="header">
    <Navbar />
    <div className="message">リモートワークでもしっかりと休憩を</div>
    <div className="subMessage">休憩と作業の時間管理に特化したツール</div>
    <div className="headerImageContainer">
      <img className="headerImage" src={coffeeBreakImage} alt="break_image" />
    </div>
  </div>
);

export default Header;

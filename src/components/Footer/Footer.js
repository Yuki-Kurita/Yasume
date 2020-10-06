import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => (
  <footer>
    <ul>
      <li>
        <a href="https://tyotto-good.com/">Blog</a>
      </li>
      <li>
        <Link to="/singleRoom">Go to App</Link>
      </li>
    </ul>
    <p>© All rights reserved by Tyotto-good.</p>
  </footer>
);

export default Footer;

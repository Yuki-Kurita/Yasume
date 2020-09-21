import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Burger from "../Burger/Burger";

const Nav = styled.nav`
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: space-between;
  background-color: ${({ isTimer }) => isTimer && "#199509"};
  padding-bottom: 4.5rem;
  .logo {
    font-family: "Roboto", sans-serif;
    color: #fff;
    padding-top: 1rem;
    text-shadow: 4px 4px 3px #25924f, -3px -3px 5px #33c66b;
    font-size: 1.7rem;
    font-weight: 900;
    margin-botton: 1rem;
    padding: 15px 30px 20px;
  }
`;

const Navbar = ({ isTimer }) => {
  return (
    <Nav isTimer={isTimer}>
      <Link to="/">
        <div className="logo">Yasume</div>
      </Link>
      <Burger />
    </Nav>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import logo from "./risingBull.png";
import "./Header.css";

const Header = ({ customer }) => {
  const userLogOut = () => {
    window.location.reload(false);
    window.localStorage.removeItem("token");
  };
  return (
    <div className="ui secondary pointing menu">
      <div>
        {" "}
        <img className="logo" src={logo} alt="logo" />
      </div>
      <h2> Crypto Bull Trading</h2>
      <Link to="/Home" className="right item">
        {" "}
        Prices
      </Link>
      <Link to="/Account" className="right item">
        {" "}
        My Account{" "}
      </Link>

      <Link to="/login" className="right item">
        <spanc onClick={userLogOut}>Log Out</spanc> <i class="user logout icon"></i>
      </Link>
    </div>
  );
};

export default Header;

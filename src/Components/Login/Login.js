import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Login.css";
import Tokens from "../../API/Tokens";

/****************************************************** */
export default function Login({ setToken, setCust }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  /****************************************************** */
  const handleSubmit = async (e) => {
    e.preventDefault();
    userLogin(username, password);
  };

  /********************************************************** */
  const userLogin = async (usr, pwd) => {
    try {
      const { data } = await Tokens.get(`/Tokens/${usr}`);
      console.log(data, data.token);
      setToken(data.token);
      setCust(data);
    } catch (e) {
      console.log({ errorMsg: e.message });
    }
  };
  /************************************************************* */

  return (
    <div className="login-wrapper">
      <h1>Sign in to Crypto Bull</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

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
      setToken(data.token);
      setCust(data);
    } catch (e) {
      console.log({ errorMsg: e.message });
    }
  };
  /************************************************************* */

  return (
    <div className="login-wrapper">
      <div className="ui placeholder segment">
        <div className="ui two column very relaxed stackable grid">
          <div className="column">
            <div className="ui form">
              <div className="field">
                <label>Username</label>
                <div className="ui left icon input">
                  <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <i className="user icon"></i>
                </div>
              </div>
              <div className="field">
                <label>Password</label>
                <div className="ui left icon input">
                  <input type="password" onChange={(e) => setPassword(e.target.value)} />
                  <i className="lock icon"></i>
                </div>
              </div>
              <div className="ui blue submit button" onClick={handleSubmit}>
                Login
              </div>
            </div>
          </div>
          <div className="middle aligned column">
            <div className="ui big button">
              <i className="signup icon"></i>
              Sign Up
            </div>
          </div>
        </div>
        <div className="ui vertical divider">Or</div>
      </div>
    </div>
    // <div className="login-wrapper">
    //   <h1>Sign in to Crypto Bull</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       <p>Username</p>
    //     </label>
    //     <div className="ui left icon input">
    //       <input type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
    //       <i className="user icon"></i>
    //     </div>

    //     <label>
    //       <p>Password</p>
    //     </label>
    //     <div className="ui left icon input">
    //       <input type="password" onChange={(e) => setPassword(e.target.value)} />
    //       <i className="lock icon"></i>
    //     </div>
    //     <div>
    //       <button className="ui blue submit button" type="submit">
    //         Login
    //       </button>
    //     </div>
    //   </form>
    // </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

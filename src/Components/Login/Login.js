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
      //   console.log(data, data.token);
      setToken(data.token);
      setCust(data);
    } catch (e) {
      console.log({ errorMsg: e.message });
    }
  };
  /************************************************************* */

  return (
    <div className="login-wrapper">
      <div class="ui placeholder segment">
        <div class="ui two column very relaxed stackable grid">
          <div class="column">
            <div class="ui form">
              <div class="field">
                <label>Username</label>
                <div class="ui left icon input">
                  <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <i class="user icon"></i>
                </div>
              </div>
              <div class="field">
                <label>Password</label>
                <div class="ui left icon input">
                  <input type="password" onChange={(e) => setPassword(e.target.value)} />
                  <i class="lock icon"></i>
                </div>
              </div>
              <div class="ui blue submit button" onClick={handleSubmit}>
                Login
              </div>
            </div>
          </div>
          <div class="middle aligned column">
            <div class="ui big button">
              <i class="signup icon"></i>
              Sign Up
            </div>
          </div>
        </div>
        <div class="ui vertical divider">Or</div>
      </div>
    </div>
    // <div className="login-wrapper">
    //   <h1>Sign in to Crypto Bull</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       <p>Username</p>
    //     </label>
    //     <div class="ui left icon input">
    //       <input type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
    //       <i class="user icon"></i>
    //     </div>

    //     <label>
    //       <p>Password</p>
    //     </label>
    //     <div class="ui left icon input">
    //       <input type="password" onChange={(e) => setPassword(e.target.value)} />
    //       <i class="lock icon"></i>
    //     </div>
    //     <div>
    //       <button class="ui blue submit button" type="submit">
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

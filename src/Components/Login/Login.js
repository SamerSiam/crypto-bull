import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './Login.css'
import Tokens from '../../API/Tokens'



  /****************************************************** */
export default function Login({setToken }) {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    // const [token, setThisToken] = useState();

  /****************************************************** */
    const handleSubmit = async e => {
        e.preventDefault();
       userLogin(username,password)
        // setThisToken(userToken)
        // console.log("IN FORM SUBMIT",token)
        // setToken(userToken);
       
      }
  
  /********************************************************** */
  const userLogin= async(usr,pwd)=> {
    try{
        const { data } = await Tokens.get(`/Tokens/${usr}`)
        // setThisToken(data.token)
       console.log(data, data.token)
        setToken(data.token);
    //    return data.token;
        
      } catch (e) {
        console.log({ errorMsg: e.message });
      }
     
  }
/************************************************************* */

    return(

    <div className="login-wrapper">
    <h1>Sign in to Crypto Bull</h1>
    <form onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input type="text" onChange={e => setUserName(e.target.value)}/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)}/>
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    </div>

  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }

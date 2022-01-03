import "./App.css";
import React, { useState } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Display from "./Components/Display/Display";
import Header from "./Components/Header/Header";
import Account from "./Components/Account/Account";
import Preferences from "./Components/Preferences/Preferences";
import Login from "./Components/Login/Login";
// import useToken from './useToken.js'

// function setToken(userToken) {
//   localStorage.setItem('token', JSON.stringify(userToken));
// }

function App() {
  // const token = getToken();

  const [token, setToken] = useState();
  const [customer, setCust] = useState({});

  // useEffect(()=>{
  //     localStorage.setItem('token', JSON.stringify(userToken));
  //     const tokenString = localStorage.getItem('token');
  //     const userToken = JSON.parse(tokenString);
  //     console.log("inside gettoken", userToken)
  //    setToken(userToken);

  // },[token])

  //  const [stateToken,setStateToken]=useState()
  // const {localToken,setLocalToken}= useToken();
  

  if (!token) {
    return <Login setToken={setToken} setCust={setCust} />;
  }
 
// console.log("inside app custId", customer.firstname);
  return (
    <div className="App">
      <BrowserRouter>
      <Route
      render={(props) => <Header customer={customer} {...props} />}>
      </Route> 
      <Switch>
          <Route path="/Home">
            <Display />
          </Route>

          <Route
            path="/Account"
            render={(props) => <Account customer={customer} {...props} />}>
          
          </Route>

          <Route path="/preferences">
            {" "}
            <Preferences />{" "}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

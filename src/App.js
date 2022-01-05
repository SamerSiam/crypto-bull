import "./App.css";
import React, { useState, useEffect } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Display from "./Components/Display/Display";
import Header from "./Components/Header/Header";
import Account from "./Components/Account/Account";
import Login from "./Components/Login/Login";

function App() {
  const [token, setToken] = useState(null);
  const [customer, setCust] = useState({});

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    }
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    setToken(userToken);
  }, [token]);

  if (!token) {
    return <Login setToken={setToken} setCust={setCust} />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Route render={(props) => <Header customer={customer} {...props} />}></Route>
        <Switch>
          <Route
            path="/Home"
            render={(props) => <Display customer={customer} {...props} />}
          ></Route>

          <Route
            path="/Account"
            render={(props) => <Account customer={customer} {...props} />}
          ></Route>

          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

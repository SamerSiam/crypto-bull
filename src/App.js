import './App.css';
import React,{useState} from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Display from './Components/Display/Display'
import Header from './Components/Header/Header'
import Dashboard from './Components/Dashboard/Dashboard'
import Preferences from './Components/Preferences/Preferences'
import Login from './Components/Login/Login'

function App() {
 
const [token,setToken]=useState();

  
if(!token) {
  return <Login setToken={setToken} />
}

return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Switch>
        <Route path="/Home"><Display/></Route>
       
         <Route path="/dashboard"> <Dashboard /></Route>
        
         <Route path="/preferences"> <Preferences /> </Route>
           
          </Switch>
      </BrowserRouter>
    
    </div>
  );
}

export default App;

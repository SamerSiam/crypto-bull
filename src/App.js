import './App.css';
import React,{useState,useEffect} from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Display from './Components/Display/Display'
import Header from './Components/Header/Header'
import Dashboard from './Components/Dashboard/Dashboard'
import Preferences from './Components/Preferences/Preferences'
import Login from './Components/Login/Login'
// import useToken from './useToken.js'

// function setToken(userToken) {
//   localStorage.setItem('token', JSON.stringify(userToken));
// }

 function App() {
  // const token = getToken();

const [token, setToken] = useState();

// useEffect(()=>{
//     localStorage.setItem('token', JSON.stringify(userToken));
//     const tokenString = localStorage.getItem('token');
//     const userToken = JSON.parse(tokenString);
//     console.log("inside gettoken", userToken)
//    setToken(userToken);
    
  
// },[token])

//  const [stateToken,setStateToken]=useState()
// const {localToken,setLocalToken}= useToken();
//   console.log("inside app", localToken)



  console.log("inside app", token)
if(!token) {
  return <Login setToken={setToken}/>
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

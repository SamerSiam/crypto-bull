import './App.css';
import React, {useState, useEffect} from 'react'
import './App.css';
import coinData from './API/Coin.api'
import Spinner from './Components/Spinner/Spinner'
import Display from './Components/Display/Display'

function App() {
 
  const [results, setResults]=useState([]);
  const [isLoading, setLoading]=useState(false); 
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(()=>{
   
    const fetch=async()=>{
    setErrorMsg("");
    setLoading(true)
try{ 
    const {data}=await coinData.get(); 
    
    setResults(data) ;
    setLoading(false);  
    console.log("data is",data) 
}
catch (err) {setErrorMsg(err.message)}
    
    
};
fetch();

}, []);


  return (
    <div className="App">
    {isLoading? <Spinner/>:<Display items={results}/>} 
       
    
    </div>
  );
}

export default App;

import React, {useState,useEffect} from 'react'
import './Display.css'
import coinData from '../../API/Coin.api'
import Spinner from '../Spinner/Spinner'

function Display() {
   
  const [results, setResults]=useState([]);
  const [isLoading, setLoading]=useState(false); 
  const [errorMsg, setErrorMsg] = useState("Loading");

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
catch (err) {setErrorMsg(err.message)  }
    
    
};
fetch();

}, []); 

    //  {/* {isLoading? <Spinner message={errorMsg}/>
    //     :<Display items={results}/>}  */}
    
    if (isLoading===true)
    {
      return <Spinner message={errorMsg}/>
    }
  else{
    return (
      <div className="display-container">
        <table className="table">
      <tr>
        <th>Name</th>
        <th>Symbol</th>
        <th>Name</th>
        <th>Logo</th>
        <th>Current Price</th>
      </tr>
      {results.map((item, index) => (
      <div key={item.id} >
        <tr>
       <td className="item-id"> {item.id} </td>
        <td className="symbol"> {item.symbol}</td>
        <td className="name"> {item.name}</td>
        <td className="logo"> <img src={item.image} alt={item.name}/> </td>
        <td>{item.symbol}</td>
        <td> {item.current_price}</td>
        </tr>
        </div>
    ))}
    </table>
      </div>
  )
  }}

    

export default Display
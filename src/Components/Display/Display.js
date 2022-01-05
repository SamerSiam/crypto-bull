import React, { useState, useEffect } from "react";
import "./Display.css";
import coinData from "../../API/Coin.api";
import Spinner from "../Spinner/Spinner";
import Buy from "../Buy/Buy";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

function Display({ customer }) {
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Loading");
  const [buy, setBuy] = useState(false);
  const [currentCoin, setCurrenCoin] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setErrorMsg("");
      setLoading(true);
      try {
        const { data } = await coinData.get();
        setResults(data);
        setLoading(false);
        console.log("data is", data);
      } catch (err) {
        setErrorMsg(err.message);
      }
    };
    fetch();
  }, []);

  const buyCoin = (item) => {
    setBuy(true);
    setCurrenCoin(item);
  };
  if (isLoading === true) {
    return <Spinner message={errorMsg} />;
  } else if (buy === true && currentCoin) {
    return (
      <Buy currentCoin={currentCoin} currentCustomer={customer} cancelBuy={() => setBuy(false)} />
    );
  } else {
    return (
      <div className="display-container">
        <table className="ui fixed table">
          <thead>
            <tr>
              <th>Ranked</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Current Price</th>
              <th> Market Cap</th>
              <th>Volume</th>
              <th> Trade</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => (
              <tr key={item.id}>
                <td>{item.market_cap_rank}</td>
                <td className="name"> {item.name}</td>
                <td className="symbol">
                  <span className="logo">
                    <img src={item.image} alt={item.name} />
                  </span>
                  {item.symbol.toUpperCase()}
                </td>
                <td> {formatter.format(item.current_price)}</td>
                <td> {formatter.format(item.market_cap)}</td>
                <td>{formatter.format(item.total_volume)}</td>
                <td>
                  <button className="ui primary button" onClick={() => buyCoin(item)}>
                    Buy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Display;

// onClick={() => buyCoin(item.id)}

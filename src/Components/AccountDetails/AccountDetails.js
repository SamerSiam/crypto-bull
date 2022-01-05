import React from "react";
import { formatter, numFormatter } from "../utils/formatter";
import "./AccountDetails.css";

function AccountDetails({ account }) {
  console.log("details", account);
  const coins = [...account.cryptoCoins];
  console.log("coins array", coins);
  return (
    <div className="container">
      <div className="card">
        <h2> Cash Balance : {formatter.format(account.balance)}</h2>
        <h3>Crypto Balance</h3>
        {coins.map((item, index) => (
          <div key={item.coin}>
            <div className="row">
              <div className="col1">
                <div>
                  <img src={item.image} alt={item.name} />
                  <div> {numFormatter.format(item.amount)}</div>
                  {item.name}
                </div>
              </div>
              <div className="col2">Market Price: {formatter.format(item.price)}</div>
              <div className="col3">
                {" "}
                {formatter.format(item.amount * item.price)}
                <button className="mini ui primary button">Sell</button>
              </div>
            </div>
            <hr></hr>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountDetails;

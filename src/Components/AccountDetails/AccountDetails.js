import React from "react";
import formatter from "../utils/formatter";
import "./AccountDetails.css";

function AccountDetails({ account }) {
  console.log("details", account);
  const coins = [...account.cryptoCoins];
  console.log("coins array", coins);
  return (
    <div>
      <h2> Acount Balance : {formatter.format(account.balance)}</h2>
      {coins.map((item, index) => (
        <div key={item.coin}>
          <div>
            {item.coin} {item.amount}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AccountDetails;

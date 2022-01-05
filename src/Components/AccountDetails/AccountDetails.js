import React, { useState, useEffect } from "react";
import { updateUserAccount } from "../../API/Accounts.api";
import { formatter, numFormatter } from "../utils/formatter";
import "./AccountDetails.css";

function AccountDetails({ account }) {
  const [updateAccount, setupdateAccount] = useState(account);

  const coins = [...account.cryptoCoins];

  /********************************************************** */
  const sellCoin = (coinSold) => {
    const sellPrice = coinSold.price;
    let tempCoins = [...updateAccount.cryptoCoins];
    const coinExists = tempCoins.find((coin) => {
      return coin.coin === coinSold.coin;
    });

    //if user has the coin in their account, need to update the amount
    if (coinExists.amount > 0) {
      coinExists.amount = parseFloat(coinExists.amount) - 1;
    }

    /**  update account object */
    setupdateAccount((prevState) => {
      return {
        ...prevState,
        balance: prevState.balance + sellPrice,
        cryptoCoins: [...tempCoins],
      };
    });
  };

  /**********************************************************************************
   * Update API
   */
  useEffect(() => {
    const update = async () => {
      try {
        const newAcount = await updateUserAccount(updateAccount.customerID, updateAccount);
        console.log("inside update api", newAcount);
      } catch (err) {
        console.log(err.message);
      }
    };
    update();
  }, [updateAccount]);

  /************************************************************ */
  return (
    <div className="container">
      <div className="card">
        <h2> Cash Balance : {formatter.format(updateAccount.balance)}</h2>
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
                <button className="mini ui primary button" onClick={() => sellCoin(item)}>
                  Sell
                </button>
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

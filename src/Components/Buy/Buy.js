import React, { useState, useEffect } from "react";
import { getUserAccount, updateUserAccount } from "../../API/Accounts.api";
import formatter from "../utils/formatter";
import "./Buy.css";

function Buy({ currentCoin, currentCustomer, cancelBuy }) {
  console.log(currentCoin, currentCustomer);
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [account, setAccount] = useState({});
  const [funds, setFunds] = useState(false);

  /** Loading current customer account from API *****/
  useEffect(() => {
    const fetch = async () => {
      try {
        const custAcount = await getUserAccount(currentCustomer.id);
        console.log("inside buy", custAcount);
        setAccount(custAcount);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetch();
  }, [currentCustomer.id]);
  /***************************************************************** */

  /****************************************************** */
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  /****************************************************** */
  const hasEnoughFunds = () => {
    const totalPrice = currentCoin.current_price * amount;
    let tempCoins = [...account.cryptoCoins];

    const coinExists = tempCoins.find((coin) => {
      return coin.coin === currentCoin.symbol;
    });

    console.log("temp coins", tempCoins);
    console.log("totalPrice", totalPrice);

    console.log("account state var", account);

    // check if user has enough money to buy
    if (account.balance >= totalPrice) {
      setFunds(true);

      //if user has the coin in their account, need to update the amount
      if (coinExists) {
        console.log("coinExists", coinExists);
        coinExists.amount = parseFloat(coinExists.amount) + parseFloat(amount);
        console.log("coinExists after update", coinExists);
      }
      //add the coin object to the account
      else {
        let newCoin = { coin: currentCoin.symbol, amount: parseFloat(amount) };
        tempCoins.push(newCoin);
        console.log("temp coins after push", tempCoins);
      }

      /**  update account object */
      setAccount((prevState) => {
        return {
          ...prevState,
          balance: prevState.balance - totalPrice,
          cryptoCoins: [...tempCoins],
        };
      });

      // need to update coin array
    } else {
      setFunds(false);
      setMessage("You do not Have Enough Funds in Your Account");
    }
  };

  /**********************************************************************************
   * Update API
   */
  useEffect(() => {
    const update = async () => {
      if (setFunds) {
        try {
          const newAcount = await updateUserAccount(currentCustomer.id, account);
          console.log("inside update api", newAcount);
        } catch (err) {
          console.log(err.message);
        }
      }
    };
    update();
  }, [account, currentCustomer, funds]);
  /********************************************************** */
  return (
    <div className="form-container">
      {console.log("account after state update", account)}
      <form onSubmit={handleSubmit}>
        <h1>Purchase Coin</h1>
        <div className="form-coin">
          <div>
            <h3> {currentCoin.name}</h3>
          </div>
          <img src={currentCoin.image} alt={currentCoin.name} />
        </div>
        <label> Enter Amount</label>
        <input type="number" placeholder="amount" onChange={(e) => setAmount(e.target.value)} />
        <div>Total Price: {formatter.format(currentCoin.current_price * amount)}</div>
        {/* <div> Current Balance: {account.balance}</div> */}
        <button className="ui primary button" onClick={() => hasEnoughFunds()}>
          Confirm Purchase
        </button>
        <button className="ui primary button" onClick={cancelBuy}>
          Cancel
        </button>
      </form>
      <div className="error">{message}</div>
    </div>
  );
}

export default Buy;

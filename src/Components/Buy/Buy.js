import React, { useState, useEffect } from "react";
import { getUserAccount, updateUserAccount } from "../../API/Accounts.api";
import { formatter } from "../utils/formatter";
import "./Buy.css";

function Buy({ currentCoin, currentCustomer, cancelBuy }) {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [account, setAccount] = useState({});
  const [funds, setFunds] = useState(false);

  /** Loading current customer account from API *****/
  useEffect(() => {
    const fetch = async () => {
      try {
        const custAcount = await getUserAccount(currentCustomer.id);
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

    // check if user has enough money to buy
    if (account.balance >= totalPrice) {
      setFunds(true);

      //if user has the coin in their account, need to update the amount
      if (coinExists) {
        coinExists.amount = parseFloat(coinExists.amount) + parseFloat(amount);
      }
      //add the coin object to the account
      else {
        let newCoin = {
          coin: currentCoin.symbol,
          amount: parseFloat(amount),
          image: currentCoin.image,
          price: currentCoin.current_price,
          name: currentCoin.name,
        };
        tempCoins.push(newCoin);
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
      <form className="form-buy" onSubmit={handleSubmit}>
        <h1>Purchase Coin</h1>
        <div className="form-coin">
          <div>
            <h3> {currentCoin.name}</h3>
          </div>
          <img src={currentCoin.image} alt={currentCoin.name} />
        </div>
        <div className="form-row1">
          <div className="input-label"> Enter Amount</div>

          <div className="input-field">
            <input type="number" placeholder="amount" onChange={(e) => setAmount(e.target.value)} />
          </div>
        </div>
        <div className="form-row2">
          <div>Total Price: {formatter.format(currentCoin.current_price * amount)}</div>
        </div>

        <div className="form-row3">
          <div> Current Balance: {formatter.format(account.balance)}</div>
        </div>
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

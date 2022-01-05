import React, { useState, useEffect } from "react";
import { getUserAccount, updateUserAccount } from "../../API/Accounts.api";
import formatter from "../utils/formatter";

function Buy({ currentCoin, currentCustomer, cancelBuy }) {
  //   console.log(currentCoin, currentCustomer);
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [coin, setCoin] = useState({});
  const [account, setAccount] = useState({});
  const [confirm, setConfirm] = useState(false);

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
  useEffect(() => {
    //   const confirmPurchase = () => {
    // const updateUserId = currentCustomer.id;
    const totalPrice = currentCoin.current_price * amount;
    const updateAccount = account;
    const updateAmount = amount;

    // check if user has enough money to buy
    if (updateAccount.balance >= totalPrice) {
      updateAccount.balance -= totalPrice;

      //check if use has already this coin in their account
      const exists = updateAccount.cryptoCoins.find((coin) => {
        return coin.coin === currentCoin.symbol;
      });
      console.log("updateaccount", updateAccount);
      if (exists) {
        exists.amount = parseFloat(exists.amount) + updateAmount;
        console.log("exists", exists, updateAccount.balance);
      } else {
        setCoin({ coin: currentCoin.symbol, amount: updateAmount });
        updateAccount.cryptoCoins.push(coin);
        console.log("new account coin", updateAccount, updateAmount);
      }
    } else {
      setMessage("You Do not have Enough Funds!");
      //   return;
    }
    //   };
    const update = async () => {
      try {
        const newAcount = await updateUserAccount(currentCustomer.id, updateAccount);
        console.log("inside buy", newAcount);
        setAccount(newAcount);
      } catch (err) {
        console.log(err.message);
      }
    };
    update();
  }, [amount]);
  /****************************************************** */
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="form-container">
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
        <button className="ui primary button" onClick={() => setConfirm(true)}>
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

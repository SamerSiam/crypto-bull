import React, { useState, useEffect } from "react";
import { getUserAccount } from "../../API/Accounts.api";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});
function Buy({ currentCoin, currentCustomer }) {
  console.log(currentCoin, currentCustomer);
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [coin, setCoin] = useState({});
  const [account, setAccount] = useState({});

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
    const totalAmount = currentCoin.current_price * amount;
    console.log("total", totalAmount);
    if (account.balance >= totalAmount) {
      account.balance -= totalAmount;
      const exists = account.cryptoCoins.find((coin) => {
        return coin.coin === currentCoin.symbol;
      });
      console.log("exists", exists);
      if (exists) {
        exists.amount = parseFloat(exists.amount) + amount;
        console.log("exists", exists, account.balance);
      } else {
        setCoin({ coin: currentCoin.symbol, amount: amount });
        account.cryptoCoins.push(coin);
        console.log("new account", account);
      }
    } else {
      setMessage("You Do not have Enough Funds!");
      return;
    }
  }, [amount, coin, account]);
  /****************************************************** */

  return (
    <div className="form-container">
      <form>
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
        <button className="ui primary button">Confirm Purchase</button>
      </form>
    </div>
  );
}

export default Buy;

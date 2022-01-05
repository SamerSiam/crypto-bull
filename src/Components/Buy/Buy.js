import React, { useState, useEffect } from "react";
import { getUserAccount, updateUserAccount } from "../../API/Accounts.api";
import formatter from "../utils/formatter";
import "./Buy.css";

function Buy({ currentCoin, currentCustomer, cancelBuy }) {
  console.log(currentCoin, currentCustomer);
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [coin, setCoin] = useState({});
  const [account, setAccount] = useState({});
  const [confirm, setConfirm] = useState(false);
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
  }, []);
  /***************************************************************** */
  useEffect(() => {
    //   const confirmPurchase = () => {
    // const updateUserId = currentCustomer.id;
    const totalPrice = currentCoin.current_price * amount;
    const updateAccount = account;
    // const updateAmount = amount;
    console.log("totalPrice", totalPrice);
    console.log("updateAccount", updateAccount);
    console.log("account state var", account);

    // check if user has enough money to buy
    // if (updateAccount.balance >= totalPrice) {
    //   updateAccount.balance -= totalPrice;

    //check if use has already this coin in their account
    //   const exists = updateAccount.cryptoCoins.find((coin) => {
    //     return coin.coin === currentCoin.symbol;
    //   });
    //   console.log("updateaccount", updateAccount);
    //   if (exists) {
    //     exists.amount = parseFloat(exists.amount) + updateAmount;
    //     console.log("exists", exists, updateAccount.balance);
    //   } else {
    //     setCoin({ coin: currentCoin.symbol, amount: updateAmount });
    //     updateAccount.cryptoCoins.push(coin);
    //     console.log("new account coin", updateAccount, updateAmount);
    //   }
    // } else {
    //   setMessage("You Do not have Enough Funds!");
    //   //   return cancelBuy;
    // }
    //   };

    // updating API with the new account info
    // const update = async () => {
    //   if (confirm) {
    //     try {
    //       const newAcount = await updateUserAccount(currentCustomer.id, updateAccount);
    //       console.log("inside buy", newAcount);
    //       setAccount(newAcount);
    //     } catch (err) {
    //       console.log(err.message);
    //     }
    //   }
    // };
    // update();
  }, []);
  /****************************************************** */
  const handleSubmit = (event) => {
    event.preventDefault();
  };

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
  }, [account, currentCustomer]);
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

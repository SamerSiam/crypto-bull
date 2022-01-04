import React from "react";
import { getUserAccount } from "../../API/Accounts.api";

function Buy({ currentCoin, currentCustomer }) {
  console.log(currentCoin, currentCustomer);
  const fetch = async () => {
    try {
      const cust = await getUserAccount(currentCustomer.id);
      console.log("inside buy", cust);
    } catch (err) {
      console.log(err.message);
    }
  };
  fetch();
  return (
    <div>
      <h1>inside buy component</h1>
    </div>
  );
}

export default Buy;

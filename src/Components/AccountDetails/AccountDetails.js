import React from "react";

function AccountDetails({ account }) {
  console.log("details", account);
  const coins = [...account.cryptoCoins];
  console.log("coins array", coins);
  return (
    <div>
      <h2> Acount Balance : ${account.balance}</h2>
      <h3> {coins[0]}</h3>
    </div>
  );
}

export default AccountDetails;

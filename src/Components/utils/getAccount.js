import React, { useState, useEffect } from "react";
import accountData from "../../API/Tokens";

function Account({ customer }) {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await accountData.get("Accounts");

        if (customer && data) {
          const customerAct = data.filter((act) => act.customerID === parseInt(customer.id));
          console.log("account is", data, customer.id, customerAct);
          setAccount(customerAct[0]);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetch();
  }, [customer]);

  //   if (!account) return <div></div>;

  return account;
  // <div>
  //   <AccountDetails account={account} />
  // </div>
}

export default Account;

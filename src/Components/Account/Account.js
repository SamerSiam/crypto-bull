import React, { useState, useEffect, useRef } from "react";
import accountData from "../../API/Tokens";
import AccountDetails from "../AccountDetails/AccountDetails";

function Account({ customer }) {
  const [account, setAccount] = useState(null);
  const [errorMsg, setErrorMsg] = useState("Loading");
  const customerID = useRef(customer.id);

  console.log("inside accounts userefs", customerID);
  console.log("inside accounts customer object", customer);

  useEffect(() => {
    if (!customer) {
      console.log("inside !customer");
      return;
    }
    const fetch = async () => {
      setErrorMsg("");

      try {
        console.log("try");
        const { data } = await accountData.get("Accounts");

        const customerAct = data.filter((act) => {
          console.log("filter", customerAct);
          return act.customerID === customer.id;
        });
        console.log("account is", data, customer.id, customerAct);
        setAccount(customerAct[0]);
      } catch (err) {
        setErrorMsg(err.message);
      }
    };
    fetch();
  }, []);

  if (!account) return <div></div>;

  return (
    <div>
      <AccountDetails account={account} />
    </div>
  );
}

export default Account;

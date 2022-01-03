import React, { useState, useEffect, useRef } from "react";
import accountData from "../../API/Tokens";
import AccountDetails from "../AccountDetails/AccountDetails";

function Account({ customer }) {
  const [account, setAccount] = useState(null);
  const [errorMsg, setErrorMsg] = useState("Loading");
  //   const customerID = useRef(customer.id);

  useEffect(() => {
    const fetch = async () => {
      setErrorMsg("");

      try {
        console.log(" inside try");
        const { data } = await accountData.get("Accounts");
        console.log(" API accounts", data);

        if (customer && data) {
          const customerAct = data.filter((act) => act.customerID === parseInt(customer.id));
          console.log("account is", data, customer.id, customerAct);
          setAccount(customerAct[0]);
        }
      } catch (err) {
        setErrorMsg(err.message);
      }
    };
    fetch();
  }, [customer]);

  if (!account) return <div></div>;

  return (
    <div>
      <AccountDetails account={account} />
    </div>
  );
}

export default Account;

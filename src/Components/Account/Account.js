import React, { useState, useEffect } from "react";
import { getUserAccount } from "../../API/Accounts.api";
import AccountDetails from "../AccountDetails/AccountDetails";

function Account({ customer }) {
  const [account, setAccount] = useState(null);
  const [errorMsg, setErrorMsg] = useState("Loading");

  useEffect(() => {
    const fetch = async () => {
      setErrorMsg("");

      try {
        const custAcount = await getUserAccount(customer.id);
        setAccount(custAcount);
      } catch (err) {
        setErrorMsg(err.message);
      }
    };
    fetch();
  }, [customer]);

  if (!account) return <div></div>;

  if (!errorMsg) {
    return (
      <div>
        <AccountDetails account={account} />
      </div>
    );
  }
}

export default Account;

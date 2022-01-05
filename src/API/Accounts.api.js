import axios from "axios";

const api = axios.create({
  baseURL: "https://61c307299cfb8f0017a3e8c1.mockapi.io/",
});

export const getUserAccount = async (userId) => {
  try {
    let { data } = await api.get("Accounts");
    const customerAct = data.filter((act) => act.customerID === parseInt(userId));
    return customerAct[0];
  } catch (e) {
    console.log(e.message);
  }
};

export const updateUserAccount = async (userId, obj) => {
  try {
    const { data } = await api.put(`Accounts/${userId}`, obj);
    return data;
  } catch (e) {
    console.log(e.message);
    console.dir(e);
  }
};

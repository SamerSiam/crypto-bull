import axios from "axios";

// export default axios.create({
//   baseURL: "https://61c305e19cfb8f0017a3e8b3.mockapi.io/",
const api = axios.create({
  baseURL: "https://61c305e19cfb8f0017a3e8b3.mockapi.io/",
});

export const getUsers = async () => {
  try {
    let { data } = await api.get("account");
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const getUser = async (id) => {
  try {
    const { data } = await api.get(`account/${id}`);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const updateUser = async (id, obj) => {
  try {
    const { data } = await api.put(`account/${id}`, obj);
    return data;
  } catch (e) {
    console.log(e.message);
    console.dir(e);
  }
};

export const creatUser = async (obj) => {
  try {
    let { data } = await api.post(`account`, obj);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteUser = async (id) => {
  try {
    let { data } = await api.delete(`account/${id}`);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

import { useState } from 'react';

export default async function useToken() {

  const getToken =async () => {
    const tokenString =  localStorage.getItem('token');
    const userToken =await JSON.parse(tokenString);
    return userToken?.token
};
const [token, setToken] = useState(await getToken());

  const saveToken = userToken => {
     localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
    console.log(userToken.token)
  };
console.log(token)
console.log(setToken)
  return {
    setToken: saveToken,
    token
  }
}
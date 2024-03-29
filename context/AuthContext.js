import { createContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const loginFunction = async (data) => {
    try {
      setIsLoading(true);
      axios.post('https://aplikaceturistickedestinace.azurewebsites.net/api/User/Login', data)
        .then(res => {
            console.log(res.data)
            SecureStore.setItemAsync('userToken', res.data.accessToken);
            setUserToken(res.data.accessToken);
        })
        .catch(err => console.error('login'+err));
      setIsLoading(false);
    } catch(err) {
      console.error('login2'+err);
    }
  }

  const logoutFunction = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setUserToken(null);
    setIsLoading(false)
  }

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      var userToken = await SecureStore.getItemAsync('userToken');
      setUserToken(userToken);
      console.log(userToken);
      setIsLoading(false);
    } catch(err) {
      console.error('login3'+err);
    }
  }

  useEffect(() => {
    isLoggedIn();
  },[userToken, setUserToken]);

  return (
    <AuthContext.Provider value={{loginFunction, logoutFunction, isLoading, userToken}}>
      {children}
    </AuthContext.Provider>
  );
}
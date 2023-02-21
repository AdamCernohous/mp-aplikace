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
      axios.post('https://ea57-95-85-212-16.eu.ngrok.io/api/User/Login', data)
        .then(res => SecureStore.setItemAsync('userToken', res.data.accessToken));
      setIsLoading(false);
    } catch(err) {
      console.error(err);
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
      console.error(err);
    }
  }

  useEffect(() => {
    isLoggedIn();
  },[userToken]);

  return (
    <AuthContext.Provider value={{loginFunction, logoutFunction, isLoading, userToken}}>
      {children}
    </AuthContext.Provider>
  );
}
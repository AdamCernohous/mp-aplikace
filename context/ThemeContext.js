import { createContext, useEffect, useState } from "react";
import { AsyncStorage } from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(false);

  const storeTheme = async (value) => {
    try {
      await AsyncStorage.setItem('theme', value.toString());
    } catch (err) {
      console.error(err);
    }
  };

  const getStoredTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('theme');
      setTheme(storedTheme === 'true');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    storeTheme(theme);
    getStoredTheme();
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}
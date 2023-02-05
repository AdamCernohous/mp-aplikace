import 'react-native-gesture-handler';
import { StatusBar, Text } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './routes/AuthStack';
import AppStack from './routes/AppStack';
import { AuthProvider, AuthContext } from './context/AuthContext';

const Root = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const {isLoading, userToken} = useContext(AuthContext);

  useEffect(() => {
    const prepare = async () => {
      try{
        await Font.loadAsync({
          'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
          'poppins-black': require('./assets/fonts/Poppins-Black.ttf'),
        })
      } catch(err){
        console.err(err);
      } finally {
        setIsLoaded(true);
      }
    }

    prepare();
  }, []);

  if(isLoaded){
    return(
      <NavigationContainer>
        {userToken != null ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    );
  } else {
    return(
      <Text>Loading</Text>
    );
  }
}
 
export default Root;

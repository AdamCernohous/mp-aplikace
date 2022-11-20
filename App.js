import { Text, View, Button } from 'react-native';
import { useState, useCallback, useEffect } from 'react';
import * as Font from 'expo-font';
import Welcome from './Welcome';
import Navigator from './routes/loginStack';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

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
        console.log('Fetch sucessfull!')
        setIsLoaded(true);
      }
    }

    prepare();
  }, []);

  if(isLoaded){
    return(
      <Navigator />
    );
  } else {
    return(
      <Text>Loading</Text>
    );
  }
}
 
export default App;

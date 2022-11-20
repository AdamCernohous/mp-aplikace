import { View, Text } from 'react-native';
import login from './assets/styles/login';

const AfterLogin = () => {
  return (
    <View style={login.container}>
      <View style={login.view}>
        <Text style={login.titleBlack}>You are logged in.</Text>
      </View>
    </View>
  );
}
 
export default AfterLogin;
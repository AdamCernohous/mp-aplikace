import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import login from './assets/styles/login';

const Welcome = ({ navigation }) => {
  const navigationHandler = (screen) => {
    navigation.navigate(screen);
  }

  return (
    <View style={login.container}>
      <View style={login.view}>
        <Text style={login.titleBlack}>Welcome.</Text>
        <View style={login.center}>
          <TouchableOpacity onPress={() => navigationHandler('Login')} style={login.button}>
            <Text style={login.text}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigationHandler('Register')} style={login.button}>
            <Text style={login.text}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
 
export default Welcome;
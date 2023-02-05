import { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import login from './assets/styles/login';
import { AuthContext } from './context/AuthContext';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const {loginFunction} = useContext(AuthContext);

  var data = {
    userName: "",
    password: ""
  };

  useEffect(() => {
    data = {
      userName: username,
      password: password
    }
  },[username, password])

  // useEffect(() => {
  //   if(accessToken != null && refreshToken != null){
  //     navigation.navigate('AfterLogin');
  //   }
  // }, [accessToken, refreshToken]);

  // const Login = async () => {
  //   if(username.length > 0 && password.length > 0){
  //     await fetch('https://2786-95-85-212-16.eu.ngrok.io/api/User/Login', {
  //       method: 'POST',
  //       headers: {
  //         'content-type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         userName: username,
  //         password: password
  //       })
  //     })
  //     .then(res => res.json())
  //     .then(data => {
  //       setAccessToken(data.accessToken);
  //       setRefreshToken(data.refreshToken);
  //       if(data.message != null){
  //         Alert.alert(
  //           "Login failed!",
  //           data.message,
  //           [
  //             {
  //               text: 'OK'
  //             }
  //           ]
  //         );
  //       }
  //       console.log(data);
  //     })
  //     .catch(err => console.error(err));
  //   }
  // }

  return (
    <View style={login.container}>
      <View style={login.view}>
        <Text style={login.titleBlack}>Login.</Text>
        <View>
          <TextInput
            style={login.input}
            placeholder='Username'
            placeholderTextColor={'#9AE5FF'}
            onChangeText={text => {
              setUsername(text);
            }}
          />
          <TextInput
            style={login.input}
            placeholder='Password'
            secureTextEntry={true}
            placeholderTextColor={'#9AE5FF'}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={login.center}>
          <TouchableOpacity onPress={() => loginFunction(data)} style={login.button}>
            <Text style={login.text}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
 
export default Login;
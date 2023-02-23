import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import login from './assets/styles/login';

const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === true) {
      return true;
    }
    else {
      return false;
    }
  }

  const Register = async () => {
    if(username.length > 0 && validateEmail(email) && password.length > 0){
      await fetch('https://be2c-95-85-212-16.eu.ngrok.io/api/User/Register', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        })
      })
      .then(res => res.json())
      .then(data => {
        if(data.success == false){
          Alert.alert(
            "Registration failed!",
            data.message,
            [
              {
                text: 'OK'
              }
            ]
          );
        } else {
          navigation.goBack();
        }
        console.log(data);
      })
      .catch(err => console.error(err));
    }
    else {
      Alert.alert(
        'Oops!',
        'Make sure to fill all input fields.',
        [
          {
            text: 'OK'
          }
        ]
      )
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={login.container}>
      <View style={login.view}>
        <Text style={login.titleBlack}>Register.</Text>
        <View>
          <TextInput
            style={login.input}
            placeholder='Username'
            placeholderTextColor={'#9AE5FF'}
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            style={login.input}
            placeholder='Email'
            placeholderTextColor={'#9AE5FF'}
            onChangeText={text => {
              setEmail(text);
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
          <TouchableOpacity onPress={() => Register()} style={login.button}>
            <Text style={login.text}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}
 
export default Register;
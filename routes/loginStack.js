import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Welcome from '../Welcome';
import Login from "../Login";
import AfterLogin from "../AfterLogin";
import Register from "../Register";

const LoginStack = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      headerShown: false
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: null,
      headerTintColor: '#FFF',
      headerStyle: {
        backgroundColor: '#25BDF2'
      }
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: null,
      headerTintColor: '#FFF',
      headerStyle: {
        backgroundColor: '#25BDF2'
      }
    }
  },
  AfterLogin: {
    screen: AfterLogin,
    navigationOptions: {
      headerShown: false
    }
  }
});

export default createAppContainer(LoginStack);
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../Welcome";
import Login from "../Login";
import Register from "../Register";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}} />
      <Stack.Screen name="Login" component={Login} options={{title: null, headerTintColor: '#FFF', headerStyle: {backgroundColor: '#25BDF2'}}} />
      <Stack.Screen name="Register" component={Register} options={{title: null, headerTintColor: '#FFF', headerStyle: {backgroundColor: '#25BDF2'}}} />
    </Stack.Navigator>
  );
}
 
export default AuthStack;
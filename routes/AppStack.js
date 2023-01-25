import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import Home from "../Home";
import Map from "../Map";

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <>
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Map" component={Map} />
    </Drawer.Navigator>
    <CustomDrawer />
    </>
  );
}
 
export default AppStack;
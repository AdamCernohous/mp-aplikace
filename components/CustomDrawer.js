import { View, SafeAreaView } from "react-native";
import { DrawerItemList } from "@react-navigation/drawer";
import global from "../assets/styles/global";

const CustomDrawer = (props) => {
  return (
    <SafeAreaView>
      <DrawerItemList {...props} />
    </SafeAreaView>
  );
}
 
export default CustomDrawer;
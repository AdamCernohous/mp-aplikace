import { View, SafeAreaView, TouchableOpacity } from "react-native";
import drawer from "../assets/styles/drawer";
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const CustomDrawer = () => {
  const navigation = useNavigation();

  const [active, setActive] = useState(1);

  return (
    <View style={drawer.container}>
      <TouchableOpacity onPress={() => {
        setActive(1);
        navigation.navigate('Home')
      }}>
        <MaterialIcons name='home' size={32} color={active === 1 ? '#23ABDB' : '#949494'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        setActive(2);
        navigation.navigate('Map');
      }}>
        <MaterialIcons name='map-outline' size={32} color={active === 2 ? '#23ABDB' : '#949494'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        setActive(3);
        navigation.navigate('Leaderboard');
      }}>
        <MaterialIcons name='trophy' size={32} color={active === 3 ? '#23ABDB' : '#949494'} />
      </TouchableOpacity>
    </View>
  );
}
 
export default CustomDrawer;
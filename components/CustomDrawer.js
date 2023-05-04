import { View, TouchableOpacity } from "react-native";
import drawer from "../assets/styles/drawer";
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

const CustomDrawer = () => {
  const navigation = useNavigation();

  const {theme} = useContext(ThemeContext);

  const [active, setActive] = useState(1);

  return (
    <View style={[drawer.container, {backgroundColor: theme ? '#FFF' : '#1D1D1D'}]}>
      <TouchableOpacity onPress={() => {
        setActive(1);
        navigation.navigate('Home')
      }}>
        <LinearGradient
          colors={[active === 1 ? '#57B9F5' : 'transparent', active === 1 ? '#1DA1F2' : 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: 100,
            padding: 7
          }}
        >
          <MaterialIcons name='home' size={28} color={active === 1 ? '#FFF' : (theme ? '#000' : '#FFF')} />
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        setActive(2);
        navigation.navigate('Map');
      }}>
        <LinearGradient
          colors={[active === 2 ? '#57B9F5' : 'transparent', active === 2 ? '#1DA1F2' : 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: 100,
            padding: 7
          }}
        >
          <MaterialIcons name='map-outline' size={28} color={active === 2 ? '#FFF' : (theme ? '#000' : '#FFF')} />
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        setActive(3);
        navigation.navigate('Leaderboard');
      }}>
        <LinearGradient
          colors={[active === 3 ? '#57B9F5' : 'transparent', active === 3 ? '#1DA1F2' : 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: 100,
            padding: 7
          }}
        >
          <MaterialIcons name='trophy' size={28} color={active === 3 ? '#FFF' : (theme ? '#000' : '#FFF')} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
 
export default CustomDrawer;
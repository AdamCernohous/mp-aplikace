import { SafeAreaView, View, Modal, TouchableOpacity, StyleSheet, Text, Switch } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Settings = ({showSettings, setShowSettings}) => {
  const {theme, setTheme} = useContext(ThemeContext);

  return (
    <Modal visible={showSettings} animationType='slide'>
      <View style={{backgroundColor: theme ? '#FFF' : '#010101', flex: 1}}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.nav}>
            <TouchableOpacity style={{backgroundColor: '#FFF', borderRadius: '50%'}} onPress={() => setShowSettings(false)}>
              <MaterialIcons name='close' size={28} color='#000' />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={[styles.headerText, { color: theme ? '#000' : '#FFF'}]}>Settings</Text>
            <View style={styles.row}>
              <Text style={[styles.text, {fontSize: 18, color: theme ? '#000' : '#FFF'}]}>Dark mode</Text>
              <Switch
                trackColor={{false: '#626262', true: '#1DA1F2'}}
                thumbColor={theme ? '#FFF' : '#FFF'}
                ios_backgroundColor="#626262"
                onValueChange={() => setTheme(!theme)}
                value={!theme}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    marginHorizontal: '5%'
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  headerText: {
    fontSize: 28,
    fontFamily: 'lato-bold',
    marginBottom: 50
  },
  text: {
    fontFamily: 'lato-regular',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default Settings;
import { useEffect, useState } from "react";
import { View, Modal, TouchableOpacity, StyleSheet, Text, Switch, ScrollView } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Settings = ({showSettings, setShowSettings}) => {
  const {theme, setTheme} = useContext(ThemeContext);
  const {logoutFunction, userToken} = useContext(AuthContext);
  const [visitedLocations, setVisitedLocations] = useState([]);

  const getVisited = () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
    axios.get('https://aplikaceturistickedestinace.azurewebsites.net/api/User/User/Visited/AllModels')
      .then(res => setVisitedLocations(Object.values(res.data)[0]))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getVisited();
  }, [setVisitedLocations])

  return (
    <Modal visible={showSettings} animationType='slide'>
      <View style={{backgroundColor: theme ? '#FFF' : '#010101', flex: 1}}>
        <View style={[styles.safeArea, { paddingTop: 30 }]}>
          <View style={styles.nav}>
            <TouchableOpacity style={{backgroundColor: '#FFF', borderRadius: 100}} onPress={() => setShowSettings(false)}>
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
            <Text style={[styles.text, {fontSize: 18, color: theme ? '#000' : '#FFF', marginTop: 15, marginBottom: 10}]}>Visited Locations</Text>
            <ScrollView style={{height: 200}}>
              {visitedLocations && visitedLocations.map(location => {
                return(
                  <View style={{marginBottom: 5, display: 'flex', flexDirection: 'row'}}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: 50}}>
                      <View style={{position: 'absolute', left: 3.5, top: -15, width: 3, height: 30, backgroundColor: theme ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)', marginRight: 5, marginBottom: 5}} />
                      <View style={{width: 10, height: 10, borderRadius: 100, backgroundColor: theme ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)', marginRight: 5}} />
                    </View>
                    <View style={{display: 'flex', justifyContent: 'center'}}>
                      <Text style={[styles.text, {color: theme ? '#000' : '#FFF'}]}>{location.name}</Text>
                      <Text style={[styles.text, {color: theme ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'}]}>{location.dateTimeOfVisit}</Text>
                    </View>
                  </View>
                )
              })}
            </ScrollView>
            <TouchableOpacity onPress={logoutFunction} style={styles.signOutButton}>
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
          
        </View>
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
  },
  signOutButton: {
    borderRadius: 100,
    width: '100%',
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 15
  },
  signOutButtonText: {
    fontFamily: 'lato-regular',
    fontSize: 18,
    color: '#FFF'
  }
});

export default Settings;
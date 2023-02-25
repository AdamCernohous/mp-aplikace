import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import leaderboard from './assets/styles/leaderboard';
import { ThemeContext } from './context/ThemeContext';

const Leaderboard = () => {
  const [response, setResponse] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

  const {theme} = useContext(ThemeContext);

  const getData = () => {
    setIsLoading(true);
    axios.get('https://be2c-95-85-212-16.eu.ngrok.io/api/User/User/Leaderboard')
      .then(res => setResponse(res.data.leadboard))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getData();
  },[]);
  
  if(isLoading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    )
  }
  else {
    return (
      <View style={{flex: 1, backgroundColor: theme ? '#FFF' : '#010101'}}>
      <SafeAreaView style={leaderboard.container}>
        <Text style={[leaderboard.header, {color: theme ? '#000' : '#FFF'}]}>Leaderboard</Text>
        <View style={leaderboard.table}>
          <View style={leaderboard.tableHead}>
            <Text style={[leaderboard.label, {color: theme ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'}]}>Username</Text>
            <Text style={[leaderboard.label, {color: theme ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'}]}>Locations visited</Text>
          </View>
          <View style={leaderboard.table}>
            {
              response.map(user => {
                console.log(user);
                return (
                  <View style={leaderboard.tableItem}>
                    <Text style={[leaderboard.text, {color: theme ? '#000' : '#FFF'}]}>{user.user.username}</Text>
                    <Text style={[leaderboard.text, {color: theme ? '#000' : '#FFF'}]}>{user.count}</Text>
                  </View>
                )
              })
            }
          </View>
        </View>
      </SafeAreaView>
      </View>
    )
  }
}
 
export default Leaderboard;
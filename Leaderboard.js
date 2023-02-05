import axios from 'axios';
import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import leaderboard from './assets/styles/leaderboard';

const Leaderboard = () => {
  const [response, setResponse] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

  const getData = () => {
    setIsLoading(true);
    axios.get('https://fb7d-95-85-212-16.eu.ngrok.io/api/User/User/Leaderboard')
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
      <SafeAreaView style={leaderboard.container}>
        <Text style={leaderboard.header}>Leaderboard</Text>
        <View style={leaderboard.table}>
          <View style={leaderboard.tableHead}>
            <Text style={leaderboard.label}>Username</Text>
            <Text style={leaderboard.label}>Locations visited</Text>
          </View>
          <View style={leaderboard.table}>
            {
              response.map(user => {
                console.log(user);
                return (
                  <View style={leaderboard.tableItem}>
                    <Text style={leaderboard.text}>{user.user.username}</Text>
                    <Text style={leaderboard.text}>{user.count}</Text>
                  </View>
                )
              })
            }
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
 
export default Leaderboard;
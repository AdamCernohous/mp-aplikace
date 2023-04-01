import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import leaderboard from './assets/styles/leaderboard';
import { ThemeContext } from './context/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Leaderboard = () => {
  const [response, setResponse] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [pole, setPole] = useState([]);
  const [rest, setRest] = useState([]);

  const {theme} = useContext(ThemeContext);

  const getData = () => {
    setIsLoading(true);
    axios.get('https://aplikaceturistickedestinace.azurewebsites.net/api/User/User/Leaderboard')
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setPole(Object.values(data)[0].slice(0, 3));
        setRest(Object.values(data)[0].slice(3));
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getData();
  },[setPole, setRest]);
  
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
          {/* <View style={leaderboard.tableHead}>
            <Text style={[leaderboard.label, {color: theme ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'}]}>Username</Text>
            <Text style={[leaderboard.label, {color: theme ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'}]}>Locations visited</Text>
          </View> */}
          <View style={leaderboard.pole}>
            {pole && pole.map((user) => {
              if(pole.indexOf(user) === 1){
                return(
                  <View style={leaderboard.poleItem}>
                    <MaterialIcons name='numeric-2-circle' size={56} color={'silver'} />
                    <Text style={[leaderboard.text, {color: theme ? '#000' : '#FFF', marginTop: 10}]}>{user.user.username}</Text>
                    <Text style={[leaderboard.text, {color: theme ? 'rgba(0,0,0,.5)' : 'rgba(255,255,255,.5)', marginTop: 5}]}>{user.count}</Text>
                  </View>
                )
              }
            })}
            {pole && pole.map((user) => {
              if(pole.indexOf(user) === 0){
                return(
                  <View style={leaderboard.poleItem}>
                    <MaterialIcons name='numeric-1-circle' size={72} color={'gold'} />
                    <Text style={[leaderboard.text, {color: theme ? '#000' : '#FFF', marginTop: 10}]}>{user.user.username}</Text>
                    <Text style={[leaderboard.text, {color: theme ? 'rgba(0,0,0,.5)' : 'rgba(255,255,255,.5)', marginTop: 5}]}>{user.count}</Text>
                  </View>
                )
              }
            })}
            {pole && pole.map((user) => {
              if(pole.indexOf(user) === 2){
                return(
                  <View style={leaderboard.poleItem}>
                    <MaterialIcons name='numeric-3-circle' size={56} color={'#CD7F32'} />
                    <Text style={[leaderboard.text, {color: theme ? '#000' : '#FFF', marginTop: 10}]}>{user.user.username}</Text>
                    <Text style={[leaderboard.text, {color: theme ? 'rgba(0,0,0,.5)' : 'rgba(255,255,255,.5)', marginTop: 5}]}>{user.count}</Text>
                  </View>
                )
              }
            })}
          </View>
          <ScrollView style={[leaderboard.table, { marginTop: 40 }]}>
            {
              rest && rest.map(user => {
                console.log(user);
                return (
                  <View style={leaderboard.tableItem}>
                    <Text style={[leaderboard.text, {color: theme ? '#000' : '#FFF'}]}>{user.user.username}</Text>
                    <Text style={[leaderboard.text, {color: theme ? '#000' : '#FFF'}]}>{user.count}</Text>
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
      </SafeAreaView>
      </View>
    )
  }
}
 
export default Leaderboard;
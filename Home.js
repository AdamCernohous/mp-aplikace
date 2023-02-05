import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import home from "./assets/styles/home";
import HomeCard from "./components/HomeCard";
import HomeSelectBtn from "./components/HomeSelectBtn";
import BottomSheet from './components/BottomSheet';
import MaterialIcons from 'react-native-vector-icons/Fontisto';
import * as Location from 'expo-location';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [response, setResponse] = useState([]);

  const [showSheet, setShowSheet] = useState(false);
  const [sheetId, setSheetId] = useState('');

  const [currentCity, setCurrentCity] = useState('');

  const [category, setCategory] = useState(1);
  let url = 'https://fb7d-95-85-212-16.eu.ngrok.io/api/Outlook/AllOutlooks';

  const getData = () => {
    switch(category){
      case 1:
        url = 'https://fb7d-95-85-212-16.eu.ngrok.io/api/Outlook/AllOutlooks';
        break;
      case 2:
        url = 'https://fb7d-95-85-212-16.eu.ngrok.io/api/Park/AllParks';
        break;
      case 3:
        url = 'https://fb7d-95-85-212-16.eu.ngrok.io/api/Restaurant/AllRestaurants';
        break;
      case 4:
        url = 'https://fb7d-95-85-212-16.eu.ngrok.io/api/Museum/AllMuseums';
        break;
      case 5:
        url = 'https://fb7d-95-85-212-16.eu.ngrok.io/api/Castle/AllCastles';
        break;
      case 6:
        url = 'https://fb7d-95-85-212-16.eu.ngrok.io/api/Church/AllChurches';
        break;
      default:
        url = 'https://fb7d-95-85-212-16.eu.ngrok.io/api/Outlook/AllOutlooks';
        break;
    }

    axios.get(url)
      .then(data => setResponse(Object.values(data.data)[0]))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }

  const getCurrentCity = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }
  
    let location = await Location.getCurrentPositionAsync({});
    let { latitude, longitude } = location.coords;
  
    let address = await Location.reverseGeocodeAsync({ latitude, longitude });
    let city = address[0].city;

    setCurrentCity(city);
  }

  useEffect(() => {
    setIsLoading(true);
    getData();
    getCurrentCity();
  }, [category, setCategory]);

  const showContent = () => {
    if(isLoading) {
      return <ActivityIndicator size="large" />
    }

    console.log(response);
    return(
      <>
        {
          response.map(location => {
            return(
              <TouchableOpacity onPress={() => {
                setShowSheet(true);
                setSheetId(Object.values(location)[0]);
              }}>
                <HomeCard
                  key={location.CastleID}
                  name={location.name}
                  description={location.description}
                  rating={location.rating}
                />
              </TouchableOpacity>
            )
          })
        }
      </>
    )
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <View style={[home.head, {marginTop: 10, marginBottom: 10}]}>
        <View>
          <Text style={[home.text, {fontSize: 16}]}>You're in {currentCity}</Text>
          <Text style={[home.text, {fontSize: 32, fontFamily: 'lato-bold', marginBottom: 15}]}>Let's explore!</Text>
        </View>
        <View style={[home.profile, {marginBottom: 15}]}>
          <TouchableOpacity style={home.profileCenter}>
            <MaterialIcons name='person' size={28} color={'#23ABDB'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={home.container}>
        <View style={{paddingLeft: '5%', paddingRight: '5%'}}>
          <TextInput
            style={home.textInput}
            placeholder='Search'
            placeholderTextColor={'#AFAFAF'}
          />
        </View>
        <View style={{height: 70}}>
          <ScrollView horizontal={true} style={home.selectContiner}>
            <TouchableOpacity onPress={() => setCategory(1)} style={[home.select, {backgroundColor: category === 1 ? '#23ABDB' : '#FFF', alignItems: 'center', justifyContent: 'center'}]}>
              <Text style={[home.text, {color: category === 1 ? '#FFF' : '#000'}]}>Outlook</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCategory(2)} style={[home.select, {backgroundColor: category === 2 ? '#23ABDB' : '#FFF', alignItems: 'center', justifyContent: 'center'}]}>
              <Text style={[home.text, {color: category === 2 ? '#FFF' : '#000'}]}>Park</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCategory(3)} style={[home.select, {backgroundColor: category === 3 ? '#23ABDB' : '#FFF', alignItems: 'center', justifyContent: 'center'}]}>
              <Text style={[home.text, {color: category === 3 ? '#FFF' : '#000'}]}>Restaurant</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCategory(4)} style={[home.select, {backgroundColor: category === 4 ? '#23ABDB' : '#FFF', alignItems: 'center', justifyContent: 'center'}]}>
              <Text style={[home.text, {color: category === 4 ? '#FFF' : '#000'}]}>Museum</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCategory(5)} style={[home.select, {backgroundColor: category === 5 ? '#23ABDB' : '#FFF', alignItems: 'center', justifyContent: 'center'}]}>
              <Text style={[home.text, {color: category === 5 ? '#FFF' : '#000'}]}>Castle</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCategory(6)} style={[home.select, {backgroundColor: category === 6 ? '#23ABDB' : '#FFF', alignItems: 'center', justifyContent: 'center'}]}>
              <Text style={[home.text, {color: category === 6 ? '#FFF' : '#000'}]}>Church</Text>
            </TouchableOpacity>
            {/* <HomeSelectBtn bg={activeButton === 1 ? '#23ABDB' : '#FFF'} width={90} height={35} pH={10} pV={5}>
              <Text style={[home.text, {color: activeButton === 1 ? '#FFF' : '#000'}]}>Outlook</Text>
            </HomeSelectBtn> */}
          </ScrollView>
        </View>
        <ScrollView>
          {showContent()}
        </ScrollView>
        <BottomSheet
          showSheet={showSheet}
          setShowSheet={setShowSheet}
          sheetId={sheetId}
          category={category}
        />
      </View>
    </SafeAreaView>
  );
}
 
export default Home;
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { View, Text, Image, SafeAreaView, ActivityIndicator, TouchableOpacity } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import home from "./assets/styles/home";
import HomeCard from "./components/HomeCard";
import HomeSelectBtn from "./components/HomeSelectBtn";
import BottomSheet from './components/BottomSheet';
import MaterialIcons from 'react-native-vector-icons/Fontisto';
import * as Location from 'expo-location';
import { ThemeContext } from "./context/ThemeContext";
import Settings from "./components/Settings";

const Home = () => {
  const {theme} = useContext(ThemeContext);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [response, setResponse] = useState([]);
  const [images, setImages] = useState([]);

  const [showSheet, setShowSheet] = useState(false);
  const [sheetId, setSheetId] = useState('');

  const [showSettings, setShowSettings] = useState(false);

  const [currentCity, setCurrentCity] = useState('');

  const [category, setCategory] = useState(1);

  let url = 'https://ea57-95-85-212-16.eu.ngrok.io/api/Outlook/AllOutlooks';
  let thumbnailUrl = 'https://ea57-95-85-212-16.eu.ngrok.io/api/Outlook/Outlook/Thumbnail';

  const getData = () => {
    switch(category){
      case 1:
        url = 'https://ea57-95-85-212-16.eu.ngrok.io/api/Outlook/AllOutlooks';
        thumbnailUrl = 'https://ea57-95-85-212-16.eu.ngrok.io/api/Outlook/Outlook/Thumbnail';
        break;
      case 2:
        url = 'https://ea57-95-85-212-16.eu.ngrok.io/api/Park/AllParks';
        thumbnailUrl = 'https://ea57-95-85-212-16.eu.ngrok.io/api/Park/Park/Thumbnail';
        break;
      case 3:
        url = 'https://ea57-95-85-212-16.eu.ngrok.io/api/Restaurant/AllRestaurants';
        thumbnailUrl = 'https://ea57-95-85-212-16.eu.ngrok.io/api/Restaurant/Restaurant/Thumbnail';
        break;
      case 4:
        url = 'https://ea57-95-85-212-16.eu.ngrok.io/api/Museum/AllMuseums';
        thumbnailUrl = 'https://ea57-95-85-212-16.eu.ngrok.io/api/Museum/Museum/Thumbnail';
        break;
      case 5:
        url = 'https://ea57-95-85-212-16.eu.ngrok.io/api/Castle/AllCastles';
        thumbnailUrl = 'https://ea57-95-85-212-16.eu.ngrok.io/api/Castle/Castle/Thumbnail';
        break;
      case 6:
        url = 'https://ea57-95-85-212-16.eu.ngrok.io/api/Church/AllChurches';
        thumbnailUrl = 'https://ea57-95-85-212-16.eu.ngrok.io/api/Church/Church/Thumbnail';
        break;
      default:
        url = 'https://ea57-95-85-212-16.eu.ngrok.io/api/Outlook/AllOutlooks';
        thumbnailUrl = 'https://ea57-95-85-212-16.eu.ngrok.io/api/Outlook/Outlook/Thumbnail';
        break;
    }

    axios.get(url)
      .then(data => setResponse(Object.values(data.data)[0]))
      .catch(err => console.error(err));

    axios.get(thumbnailUrl)
      .then(data => setImages(Object.values(data.data)[0]))
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

    return(
      <>
        {
          response.map(location => {
            const matchingImage = images.find(
              (image) => Object.values(image)[2] === Object.values(location)[0]
            );
            const thumbnail = matchingImage ? matchingImage.bytes : '';

            return(
              <TouchableOpacity onPress={() => {
                setShowSheet(true);
                setSheetId(Object.values(location)[0]);
              }}>
                <HomeCard
                  key={Object.values(location)[0]}
                  name={location.name}
                  description={location.description}
                  rating={location.rating}
                  thumbnail={thumbnail}
                />
              </TouchableOpacity>
            )
          })
        }
      </>
    )
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme ? '#FFF' : '#010101'}}>
      <View style={[home.head, {marginTop: 10, marginBottom: 10}]}>
        <View>
          <Text style={[home.text, {fontSize: 16, color: theme ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'}]}>Current location</Text>
          <Text style={[home.text, {fontSize: 28, fontFamily: 'lato-bold', marginBottom: 10, color: theme ? '#000' : '#FFF'}]}>{currentCity}</Text>
        </View>
        <View style={[home.profile, {marginBottom: 15}]}>
          <TouchableOpacity style={home.profileCenter} onPress={() => setShowSettings(true)}>
            <MaterialIcons name='person' size={28} color={'#1DA1F2'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={home.container}>
        <View style={{paddingLeft: '5%', paddingRight: '5%'}}>
          <TextInput
            style={[home.textInput, {backgroundColor: theme ? '#EEEEEE' : '#1D1D1D'}]}
            placeholder='Search Locations'
            placeholderTextColor={theme ? '#AFAFAF' : '#626262'}
          />
        </View>
        <View style={{height: 70}}>
          <ScrollView horizontal={true} style={home.selectContiner}>
            <TouchableOpacity onPress={() => setCategory(1)} style={[home.select, {alignItems: 'center', justifyContent: 'center'}]}>
              <Text style={[home.selectText, {color: category === 1 ? '#1DA1F2' : (theme ? '#000': '#FFF')}]}>Outlook</Text>
              <View style={category === 1 ? home.selectDot : null} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCategory(2)} style={[home.select, {alignItems: 'center', justifyContent: 'center'}]}>
              <Text style={[home.selectText, {color: category === 2 ? '#1DA1F2' : (theme ? '#000': '#FFF')}]}>Park</Text>
              <View style={category === 2 ? home.selectDot : null} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCategory(3)} style={[home.select, {alignItems: 'center', justifyContent: 'center'}]}>
              <Text style={[home.selectText, {color: category === 3 ? '#1DA1F2' : (theme ? '#000': '#FFF')}]}>Restaurant</Text>
              <View style={category === 3 ? home.selectDot : null} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCategory(4)} style={[home.select, {alignItems: 'center', justifyContent: 'center'}]}>
              <Text style={[home.selectText, {color: category === 4 ? '#1DA1F2' : (theme ? '#000': '#FFF')}]}>Museum</Text>
              <View style={category === 4 ? home.selectDot : null} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCategory(5)} style={[home.select, {alignItems: 'center', justifyContent: 'center'}]}>
              <Text style={[home.selectText, {color: category === 5 ? '#1DA1F2' : (theme ? '#000': '#FFF')}]}>Castle</Text>
              <View style={category === 5 ? home.selectDot : null} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCategory(6)} style={[home.select, {alignItems: 'center', justifyContent: 'center'}]}>
              <Text style={[home.selectText, {color: category === 6 ? '#1DA1F2' : (theme ? '#000': '#FFF')}]}>Church</Text>
              <View style={category === 6 ? home.selectDot : null} />
            </TouchableOpacity>
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
        <Settings
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />
      </View>
    </SafeAreaView>
  );
}
 
export default Home;
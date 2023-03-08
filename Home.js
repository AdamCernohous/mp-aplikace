import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { View, Text, Image, SafeAreaView, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import home from "./assets/styles/home";
import HomeCard from "./components/HomeCard";
import HomeSelectBtn from "./components/HomeSelectBtn";
import BottomSheet from './components/BottomSheet';
import MaterialIcons from 'react-native-vector-icons/Fontisto';
import * as Location from 'expo-location';
import { ThemeContext } from "./context/ThemeContext";
import Settings from "./components/Settings";
import { LinearGradient } from "expo-linear-gradient";

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

  const [searched, setSearched] = useState('');

  const [searchData, setSearchedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  let url = 'https://bc25-95-85-212-16.eu.ngrok.io/api/Outlook/AllOutlooks';
  let thumbnailUrl = 'https://bc25-95-85-212-16.eu.ngrok.io/api/Outlook/Outlook/Thumbnail';

  const getData = () => {
    switch(category){
      case 1:
        url = 'https://bc25-95-85-212-16.eu.ngrok.io/api/Outlook/AllOutlooks';
        thumbnailUrl = 'https://bc25-95-85-212-16.eu.ngrok.io/api/Outlook/Outlook/Thumbnail';
        break;
      case 2:
        url = 'https://bc25-95-85-212-16.eu.ngrok.io/api/Park/AllParks';
        thumbnailUrl = 'https://bc25-95-85-212-16.eu.ngrok.io/api/Park/Park/Thumbnail';
        break;
      case 3:
        url = 'https://bc25-95-85-212-16.eu.ngrok.io/api/Restaurant/AllRestaurants';
        thumbnailUrl = 'https://bc25-95-85-212-16.eu.ngrok.io/api/Restaurant/Restaurant/Thumbnail';
        break;
      case 4:
        url = 'https://bc25-95-85-212-16.eu.ngrok.io/api/Museum/AllMuseums';
        thumbnailUrl = 'https://bc25-95-85-212-16.eu.ngrok.io/api/Museum/Museum/Thumbnail';
        break;
      case 5:
        url = 'https://bc25-95-85-212-16.eu.ngrok.io/api/Castle/AllCastles';
        thumbnailUrl = 'https://bc25-95-85-212-16.eu.ngrok.io/api/Castle/Castle/Thumbnail';
        break;
      case 6:
        url = 'https://bc25-95-85-212-16.eu.ngrok.io/api/Church/AllChurches';
        thumbnailUrl = 'https://bc25-95-85-212-16.eu.ngrok.io/api/Church/Church/Thumbnail';
        break;
      default:
        url = 'https://bc25-95-85-212-16.eu.ngrok.io/api/Outlook/AllOutlooks';
        thumbnailUrl = 'https://bc25-95-85-212-16.eu.ngrok.io/api/Outlook/Outlook/Thumbnail';
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

  useEffect(() => {
    axios.get('https://bc25-95-85-212-16.eu.ngrok.io/api/User/Models/All/Position')
      .then(res => setSearchedData(res.data.positionModels))
      .catch(err => console.error(err));
  },[setSearchedData]);

  useEffect(() => {
    setFilteredData(searchData.filter(item => item.name.toLowerCase().includes(searched.toLowerCase())));
  },[searched]);

  const searchFilter = () => {
    return(
      <ScrollView style={[home.searchContainer, { height: searched.length < 3 ? 0 : null, backgroundColor: theme ? '#FFF' : '#010101' }]}>
        {
          filteredData.map(location => {
            return(
              <TouchableOpacity 
                onPress={() => { 
                  setSheetId(location.id);
                  setSearched('');
                  setShowSheet(true);
                }}
                style={[home.searchItem, {backgroundColor: theme ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'}]}
              >
                <Text style={[home.text, {color: theme ? '#000' : '#FFF', fontSize: 16}]}>{location.name}</Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    )
  }

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              style={[home.textInput, {backgroundColor: theme ? '#EEEEEE' : '#1D1D1D', color: theme ? '#000' : '#FFF'}]}
              placeholder='Search Locations'
              placeholderTextColor={theme ? '#AFAFAF' : '#626262'}
              onChangeText={text => setSearched(text)}
            />
          </View>
          <View style={{height: 70}}>
            <ScrollView horizontal={true} style={home.selectContiner}>
              <TouchableOpacity onPress={() => setCategory(1)}>
                <LinearGradient
                  colors={[category === 1 ? '#57B9F5' : 'transparent', category === 1 ? '#1DA1F2' : 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={home.select}
                >
                  <Text style={[home.selectText, {color: category === 1 ? (theme ? '#FFF' : '#FFF') : '#1DA1F2'}]}>Outlook</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCategory(2)}>
                <LinearGradient
                  colors={[category === 2 ? '#57B9F5' : 'transparent', category === 2 ? '#1DA1F2' : 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={home.select}
                >
                  <Text style={[home.selectText, {color: category === 2 ? (theme ? '#FFF' : '#FFF') : '#1DA1F2'}]}>Park</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCategory(3)}>
                <LinearGradient
                  colors={[category === 3 ? '#57B9F5' : 'transparent', category === 3 ? '#1DA1F2' : 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={home.select}
                >
                  <Text style={[home.selectText, {color: category === 3 ? (theme ? '#FFF' : '#FFF') : '#1DA1F2'}]}>Restaurant</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCategory(5)}>
                <LinearGradient
                  colors={[category === 5 ? '#57B9F5' : 'transparent', category === 5 ? '#1DA1F2' : 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={home.select}
                >
                  <Text style={[home.selectText, {color: category === 5 ? (theme ? '#FFF' : '#FFF') : '#1DA1F2'}]}>Castle</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCategory(6)}>
                <LinearGradient
                  colors={[category === 6 ? '#57B9F5' : 'transparent', category === 6 ? '#1DA1F2' : 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={home.select}
                >
                  <Text style={[home.selectText, {color: category === 6 ? (theme ? '#FFF' : '#FFF') : '#1DA1F2'}]}>Church</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCategory(4)} style={{marginRight: 30}}>
                <LinearGradient
                  colors={[category === 4 ? '#57B9F5' : 'transparent', category === 4 ? '#1DA1F2' : 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={home.select}
                >
                  <Text style={[home.selectText, {color: category === 4 ? (theme ? '#FFF' : '#FFF') : '#1DA1F2'}]}>Museum</Text>
                </LinearGradient>
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
        {searchFilter()}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
 
export default Home;
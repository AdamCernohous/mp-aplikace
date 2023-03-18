import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, SafeAreaView, Image, TouchableWithoutFeedback } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState, useRef } from "react";
import * as Location from 'expo-location';
import axios from "axios";
import home from './assets/styles/home';
import { LinearGradient } from "expo-linear-gradient";
import BottomSheet from "./components/BottomSheet";

const Map = () => {
  const [location, setLocation] = useState();
  const [locations, setLocations] = useState([]);

  const [thumbnails, setThumbnails] = useState([]);

  const [category, setCategory] = useState(1);

  const [showSheet, setShowSheet] = useState(false);
  const [sheetId, setSheetId] = useState('');

  const mapRef = useRef(null);

  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      Alert.alert(
        "Please allow location permissions!",
        [
          {
            text: 'OK'
          }
        ]
      );
  
      return;
    }
  
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);
    console.log(currentLocation.coords);
  }

  useEffect(() => {
    getPermissions();
  },[]);

  useEffect(() => {
    if (location) {
      try {
        mapRef.current.animateToRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          // latitudeDelta: 0.1,
          // longitudeDelta: 0.1,
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [location]);

  const getLocations = () => {
    axios.get(`https://aplikaceturistickedestinace.azurewebsites.net/api/User/Models/All/Position`)
      .then(data => setLocations(data.data.positionModels))
      .catch(error => console.error(error));
  }

  const getThumbnails = () => {
    axios.get(`https://aplikaceturistickedestinace.azurewebsites.net/api/User/Models/Thumbnails`)
      .then(res => setThumbnails(Object.values(res.data)[0]))
      .catch(err => console.error(err));
  }

  const showBottomSheet = (locationType, locationID) => {
    switch (parseInt(locationType)) {
      case 0:
        setCategory(5);
        break;
      case 1:
        setCategory(6);
        break;
      case 2:
        setCategory(4);
        break;
      case 3:
        setCategory(1);
        break;
      case 4:
        setCategory(2);
        break;
      case 5:
        setCategory(3);
        break;
      default:
        setCategory(1);
        break;
    }
    setSheetId(locationID);
  }

  useEffect(() => {
    getLocations();
  }, [setLocations, location]);

  useEffect(() => {
    getThumbnails();
  },[]);

  useEffect(() => {
    showBottomSheet()
  }, [setSheetId])

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location ? location.latitude : 50.0896179,
          longitude: location ? location.longitude : 14.4009914,
          latitudeDelta: location ? location.accuracy : 0.1,
          longitudeDelta: location ? location.accuracy : 0.2,
        }}
        location={location}
      >
        {locations && locations.map(location => {
          if (typeof location === 'object') {
            return (
              <Marker
                key={location.id}
                coordinate={{ latitude: location.longtitude, longitude: location.latitude }}
                style={{width: 70, height: 70, position: 'relative'}}
                onPress={() => {
                  showBottomSheet(location.type, location.id);
                  setShowSheet(true);
                }}
              >
                <View style={styles.marker}>
                  {
                    thumbnails && thumbnails.map(thumbnail => {
                      if (thumbnail.modelID === location.id) {
                        return (
                          <Image source={{ uri: `data:image/jpeg;base64,${thumbnail.bytes}` }} style={styles.image} />
                        )
                      }
                    })
                  }
                </View>
              </Marker>
            )
          }
          return null;
        })}
      </MapView>
      <BottomSheet
        showSheet={showSheet}
        setShowSheet={setShowSheet}
        sheetId={sheetId}
        category={category}
      />
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  marker: {
    width: 70,
    height: 70,
    backgroundColor: '#1DA1F2',
    position: 'absolute',
    borderBottomLeftRadius: '50%',
    borderTopRightRadius: '50%',
    borderTopLeftRadius: '50%',
    transform: [{ rotate: '45deg' }],
    top: -45,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    position: 'absolute',
    transform: [{ rotate: '-45deg' }],
    top: 5,
    left: 5,
    zIndex: 1
  }
});
 
export default Map;
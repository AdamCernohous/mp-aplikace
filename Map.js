import { View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState, useRef } from "react";
import * as Location from 'expo-location';
import axios from "axios";

const Map = () => {
  const [location, setLocation] = useState();
  const [locations, setLocations] = useState([]);

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
    console.warn(location);
    if(location) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }, 1000);
    }
  },[location, locations]);

  const getLocations = () => {
    axios.get('https://2786-95-85-212-16.eu.ngrok.io/api/User/Models/All/Position')
    .then(data => {
      setLocations(data.data.positionModels);
      console.warn(data.data.positionModels);
    })
    .catch(error => console.warn(error));
  }

  useEffect(() => {
    getLocations();
  }, [setLocations]);

  return (
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
      {locations.map(location => {
        if(typeof location === 'object') {
          return <Marker key={location.id} coordinate={{latitude: location.longtitude, longitude: location.latitude}}/>
        }
        return null;
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});
 
export default Map;
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, SafeAreaView, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState, useRef } from "react";
import * as Location from 'expo-location';
import axios from "axios";
import home from './assets/styles/home';
import { LinearGradient } from "expo-linear-gradient";

const Map = () => {
  const [location, setLocation] = useState();
  const [locations, setLocations] = useState([]);

  const [thumbnails, setThumbnails] = useState([]);

  const [category, setCategory] = useState(1);

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
    try{
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }, 1000);
    }catch(err){
      console.error(err)
    }
  },[getPermissions]);

  useEffect(() => {
    getThumbnails();
  },[]);

  const getLocations = () => {
    axios.get(`https://3900-95-85-212-16.eu.ngrok.io/api/User/Models/All/Position`)
      .then(data => {
        setLocations(data.data.positionModels);
        console.log(data.data);
      })
      .catch(error => console.error
        (error));
  }

  const getThumbnails = () => {
    axios.get(`https://3900-95-85-212-16.eu.ngrok.io/api/Castle/Castle/Thumbnail`)
      .then(res => Object.values(res.data)[0])
      .then(data => {
        data.map(location => {
          setThumbnails([...thumbnails, {
            id: Object.values(location)[2],
            bytes: Object.values(location)[1]
          }]);
        })
      })
      .catch(err => console.error(err));
    axios.get(`https://3900-95-85-212-16.eu.ngrok.io/api/Church/Church/Thumbnail`)
      .then(res => Object.values(res.data)[0])
      .then(data => {
        data.map(location => {
          setThumbnails([...thumbnails, {
            id: Object.values(location)[2],
            bytes: Object.values(location)[1]
          }]);
        })
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    getLocations();
  }, [setLocations, location]);

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
          if(typeof location === 'object') {
            return(
              <Marker key={location.id} coordinate={{latitude: location.longtitude, longitude: location.latitude}} style={{backgroundColor: 'red'}}>
                <View style={styles.marker}>
                  {
                    thumbnails && thumbnails.map(thumbnail => {
                      if(thumbnail.id === location.id){
                        return(
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
      {/* <SafeAreaView style={{ height: 110, position: 'absolute' }}>
        <ScrollView horizontal={true} style={home.selectContiner}>
          <TouchableOpacity onPress={() => setCategory(1)}>
            <LinearGradient
              colors={[category === 1 ? '#57B9F5' : 'transparent', category === 1 ? '#1DA1F2' : 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={home.select}
            >
              <Text style={[home.selectText, { color: category === 1 ? '#FFF' : '#000' }]}>Outlook</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCategory(2)}>
            <LinearGradient
              colors={[category === 2 ? '#57B9F5' : 'transparent', category === 2 ? '#1DA1F2' : 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={home.select}
            >
              <Text style={[home.selectText, { color: category === 2 ? '#FFF' : '#000' }]}>Park</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCategory(3)}>
            <LinearGradient
              colors={[category === 3 ? '#57B9F5' : 'transparent', category === 3 ? '#1DA1F2' : 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={home.select}
            >
              <Text style={[home.selectText, { color: category === 3 ? '#FFF' : '#000' }]}>Restaurant</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCategory(5)}>
            <LinearGradient
              colors={[category === 5 ? '#57B9F5' : 'transparent', category === 5 ? '#1DA1F2' : 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={home.select}
            >
              <Text style={[home.selectText, { color: category === 5 ? '#FFF' : '#000' }]}>Castle</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCategory(6)}>
            <LinearGradient
              colors={[category === 6 ? '#57B9F5' : 'transparent', category === 6 ? '#1DA1F2' : 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={home.select}
            >
              <Text style={[home.selectText, { color: category === 6 ? '#FFF' : '#000' }]}>Church</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCategory(4)} style={{ marginRight: 30 }}>
            <LinearGradient
              colors={[category === 4 ? '#57B9F5' : 'transparent', category === 4 ? '#1DA1F2' : 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={home.select}
            >
              <Text style={[home.selectText, { color: category === 4 ? '#FFF' : '#000' }]}>Museum</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView> */}
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
    position: 'relative',
    borderBottomLeftRadius: '50%',
    borderTopRightRadius: '50%',
    borderTopLeftRadius: '50%',
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    left: -35,
    top: -90
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 1
  }
});
 
export default Map;
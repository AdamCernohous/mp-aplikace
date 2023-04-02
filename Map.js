import { View, StyleSheet, Alert, Image, TouchableOpacity } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import { useEffect, useState, useRef, useContext } from "react";
import * as Location from 'expo-location';
import axios from "axios";
import BottomSheet from "./components/BottomSheet";
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from "./context/AuthContext";

const Map = () => {
  const [location, setLocation] = useState();
  const [locations, setLocations] = useState([]);
  const [visitedLocations, setVisitedLocations] = useState([]);

  const [thumbnails, setThumbnails] = useState([]);

  const [category, setCategory] = useState(1);

  const [showSheet, setShowSheet] = useState(false);
  const [sheetId, setSheetId] = useState(null);

  const mapRef = useRef(null);

  const [zoomLevel, setZoomLevel] = useState(10);

  const [userLocation, setUserLocation] = useState();

  const {userToken} = useContext(AuthContext);


  const checkNearbyMarkers = () => {
    if(locations != [] && userLocation != null){
      locations.map(location => {
        const distance = Math.sqrt((parseFloat(userLocation.latitude) - parseFloat(location.longtitude)) ** 2 + (parseFloat(userLocation.longitude) - parseFloat(location.latitude)) ** 2);
        console.log(distance);
        if(distance <= 0.0009){
          try{
            axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
            axios.post('https://aplikaceturistickedestinace.azurewebsites.net/api/User/Model/Visited', {
              modelID: location.id
            })
              .then(res  => console.log(res.data))
              .catch(err => console.error(err));
          }
          catch(err){
            console.error(err);
          }
        }
      })
    }
  }

  useEffect(() => {
    setInterval(checkNearbyMarkers, 20000);
  },[]);

  const getVisited = () => {
    axios.get('https://aplikaceturistickedestinace.azurewebsites.net/api/User/User/Visited/AllModels',
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${userToken}`
        }
      }
    )
      .then(res => setVisitedLocations(Object.values(res.data)[0]))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getVisited();
  }, [setVisitedLocations])

  const onRegionChangeComplete = (region) => {
    const { latitudeDelta } = region;
    const zoomLevel = Math.round(Math.log(360 / latitudeDelta) / Math.LN2);
    setZoomLevel(zoomLevel);
  };

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

  const getUserLocation = () => {
    setInterval(async () => {
      let currentLocation = await Location.getCurrentPositionAsync({});
      setUserLocation(currentLocation.coords);
    }, 2000)
  }

  const centerLocation = () => {
    try {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getPermissions();
  },[]);

  useEffect(() => {
    if (location) {
      centerLocation();
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

  useEffect(() => {
    getUserLocation();
  }, [setUserLocation])

  return (
    <>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 10,
          top: 300,
          zIndex: 100
        }}
        onPress={() => centerLocation()}
      >
        <MaterialIcons name='compass' size={42} color={'#1DA1F2'} />
      </TouchableOpacity>
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
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {locations && locations.map(location => {
          const isVisited = visitedLocations && visitedLocations.some(visited => visited.modelId === location.id);
          const markerColor = isVisited ? 'green' : '#1DA1F2';

          return (
            <Marker
              key={location.id}
              coordinate={{ latitude: location.longtitude, longitude: location.latitude }}
              style={{ width: 70, height: 70, position: 'relative' }}
              onPress={() => {
                showBottomSheet(location.type, location.id);
                setShowSheet(true);
              }}
            >
              <View style={[styles.marker, { backgroundColor: markerColor }]}>
                {thumbnails && thumbnails.map(thumbnail => {
                  if (thumbnail.modelID === location.id) {
                    return (
                      <Image source={{ uri: `data:image/jpeg;base64,${thumbnail.bytes}` }} style={styles.image} />
                    )
                  }
                })}
              </View>
            </Marker>
          )
        })}
        {location && (
          <Circle
            center={{ latitude: userLocation !== undefined ? userLocation.latitude : 50.0896179, longitude: userLocation !== undefined ? userLocation.longitude : 14.4009914 }}
            radius={(20 - zoomLevel) ** 2.1}
            strokeWidth={(20 - zoomLevel) ** .5}
            strokeColor='#FFF'
            fillColor='#1DA1F2'
          />
        )}
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
    borderBottomLeftRadius: 100,
    borderTopRightRadius: 100,
    borderTopLeftRadius: 100,
    transform: [{ rotate: '45deg' }],
    top: -45,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
    position: 'absolute',
    transform: [{ rotate: '-45deg' }],
    top: 5,
    left: 5,
    zIndex: 1
  }
});
 
export default Map;
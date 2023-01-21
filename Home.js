import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import home from "./assets/styles/home";
import HomeCard from "./components/HomeCard";
import HomeSelectBtn from "./components/HomeSelectBtn";
import BottomSheet from './components/BottomSheet';
import { color } from "react-native-reanimated";

const Home = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [response, setResponse] = useState([]);

  const [showSheet, setShowSheet] = useState(false);
  const [sheetId, setSheetId] = useState('');

  const getData = () => {
    fetch('https://44aa-95-85-212-16.eu.ngrok.io/api/Castle/AllCastles')
      .then(response => response.json())
      .then(data => setResponse(data.castles))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [setResponse]);

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
                setSheetId(location.CastleID)
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#D6D6D6'}}>
      <View style={home.container}>
        <View style={{paddingLeft: '5%', paddingRight: '5%'}}>
          <TextInput
            style={home.textInput}
            placeholder='Search'
            placeholderTextColor={'#AFAFAF'}
          />
        </View>
        <View style={{height: 55}}>
          <ScrollView horizontal={true} style={home.select}>
            <HomeSelectBtn bg={'#23ABDB'} width={90} height={35} pH={10} pV={5}
            >
              <Text style={[home.text, {color: '#FFF'}]}>Outlook</Text>
            </HomeSelectBtn>
            <HomeSelectBtn bg={'#FFF'} width={70} height={35} pH={10} pV={5}
            >
              <Text style={[home.text, {color: '#000'}]}>Park</Text>
            </HomeSelectBtn>
            <HomeSelectBtn bg={'#FFF'} width={120} height={35} pH={10} pV={5}
            >
              <Text style={[home.text, {color: '#000'}]}>Restaurant</Text>
            </HomeSelectBtn>
            <HomeSelectBtn bg={'#FFF'} width={100} height={35} pH={10} pV={5}
            >
              <Text style={[home.text, {color: '#000'}]}>Museum</Text>
            </HomeSelectBtn>
            <HomeSelectBtn bg={'#FFF'}width={80} height={35} pH={10} pV={5}
            >
              <Text style={[home.text, {color: '#000'}]}>Castle</Text>
            </HomeSelectBtn>
            <HomeSelectBtn bg={'#FFF'} width={90} height={35} pH={10} pV={5}
            >
              <Text style={[home.text, {color: '#000'}]}>Church</Text>
            </HomeSelectBtn>
          </ScrollView>
        </View>
        <ScrollView>
          {showContent()}
        </ScrollView>
        <BottomSheet
          showSheet={showSheet}
          setShowSheet={setShowSheet}
        />
      </View>
    </SafeAreaView>
  );
}
 
export default Home;
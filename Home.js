import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ActivityIndicator, Modal } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import home from "./assets/styles/home";
import HomeCard from "./components/HomeCard";
import HomeSelectBtn from "./components/HomeSelectBtn";

const Home = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [response, setResponse] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const getData = () => {
    fetch('https://fe7f-95-85-212-16.eu.ngrok.io/api/Castle/AllCastles')
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
              <HomeCard
                key={location.CastleID}
                name={location.name}
                description={location.description}
                rating={location.rating}
              />
            )
          })
        }
      </>
    )
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#23ABDB'}}>
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
            <HomeSelectBtn
              bg={'#FFF'}
              color={'#000'}
              width={90}
              height={35}
              pH={10}
              pV={5}
            >
              <Text style={home.text}>Outlook</Text>
            </HomeSelectBtn>
            <HomeSelectBtn
              bg={'#FFF'}
              color={'#000'}
              width={70}
              height={35}
              pH={10}
              pV={5}
            >
              <Text style={home.text}>Park</Text>
            </HomeSelectBtn>
            <HomeSelectBtn
              bg={'#FFF'}
              color={'#000'}
              width={120}
              height={35}
              pH={10}
              pV={5}
            >
              <Text style={home.text}>Restaurant</Text>
            </HomeSelectBtn>
            <HomeSelectBtn
              bg={'#FFF'}
              color={'#000'}
              width={100}
              height={35}
              pH={10}
              pV={5}
            >
              <Text style={home.text}>Museum</Text>
            </HomeSelectBtn>
            <HomeSelectBtn
              bg={'#FFF'}
              color={'#000'}
              width={80}
              height={35}
              pH={10}
              pV={5}
            >
              <Text style={home.text}>Castle</Text>
            </HomeSelectBtn>
            <HomeSelectBtn
              bg={'#FFF'}
              color={'#000'}
              width={90}
              height={35}
              pH={10}
              pV={5}
            >
              <Text style={home.text}>Church</Text>
            </HomeSelectBtn>
          </ScrollView>
        </View>
        <ScrollView>
          {showContent()}
        </ScrollView>
        <Modal visible={true} animationType="slide">
          <View style={home.modal}>
            <Text>Hello from Modal</Text>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
 
export default Home;
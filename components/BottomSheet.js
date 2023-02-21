import { useEffect, useState } from "react";
import { Dimensions, Image, Modal, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";
import { LinearGradient } from 'expo-linear-gradient';

const BottomSheet = ({showSheet, setShowSheet, sheetId, category}) => {
  const [response, setResponse] = useState(null);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  let url = `https://ea57-95-85-212-16.eu.ngrok.io/api/Outlook/Outlook/${sheetId}`;

  const getData = () => {
    switch(category){
      case 1:
        url = `https://ea57-95-85-212-16.eu.ngrok.io/api/Outlook/Outlook/${sheetId}`;
        break;
      case 2:
        url = `https://ea57-95-85-212-16.eu.ngrok.io/api/Park/Park/${sheetId}`;
        break;
      case 3:
        url = `https://ea57-95-85-212-16.eu.ngrok.io/api/Restaurant/Restaurant/${sheetId}`;
        break;
      case 4:
        url = `https://ea57-95-85-212-16.eu.ngrok.io/api/Museum/Museum/${sheetId}`;
        break;
      case 5:
        url = `https://ea57-95-85-212-16.eu.ngrok.io/api/Castle/Castle/${sheetId}`;
        break;
      case 6:
        url = `https://ea57-95-85-212-16.eu.ngrok.io/api/Church/Church/${sheetId}`;
        break;
      default:
        url = `https://ea57-95-85-212-16.eu.ngrok.io/api/Outlook/Outlook/${sheetId}`;
        break;
    }

    axios.get(url)
      .then(data => setResponse(Object.values(data.data)[0]))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    getData();
  }, [sheetId]);

  return (
    <Modal visible={showSheet} animationType='slide'>
      <ScrollView style={{position: 'relative'}}>
        <Image
          source={require('../assets/trosky.jpg')}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: windowWidth,
            height: windowHeight/2.5,
            zIndex: -2
          }}
        />
        <LinearGradient
          colors={['transparent', '#FFF']}
          start={{ x: 0, y: .5 }}
          end={{ x: 0, y: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: windowWidth,
            height: windowHeight/2.5,
            zIndex: -1,
          }}
        />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.nav}>
            <TouchableOpacity style={{backgroundColor: '#FFF', borderRadius: '50%'}} onPress={() => setShowSheet(false)}>
              <MaterialIcons name='close' size={28} color='#000' />
            </TouchableOpacity>
          </View>

          <View style={styles.imageSelect}>

          </View>
        </SafeAreaView>
      </ScrollView>        
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    marginHorizontal: '5%'
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  imageSelect: {
    
  }
});
 
export default BottomSheet;
import { useEffect, useState } from "react";
import { Modal, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BottomSheet = ({showSheet, setShowSheet, sheetId, category}) => {
  const [response, setResponse] = useState(null);

  let ratingArray = ["", "", "", "", ""];

  let url = `https://a866-95-85-212-16.eu.ngrok.io/api/Outlook/Outlook/${sheetId}`;

  const getData = () => {
    switch(category){
      case 1:
        url = `https://a866-95-85-212-16.eu.ngrok.io/api/Outlook/Outlook/${sheetId}`;
        break;
      case 2:
        url = `https://a866-95-85-212-16.eu.ngrok.io/api/Park/Park/${sheetId}`;
        break;
      case 3:
        url = `https://a866-95-85-212-16.eu.ngrok.io/api/Restaurant/Restaurant/${sheetId}`;
        break;
      case 4:
        url = `https://a866-95-85-212-16.eu.ngrok.io/api/Museum/Museum/${sheetId}`;
        break;
      case 5:
        url = `https://a866-95-85-212-16.eu.ngrok.io/api/Castle/Castle/${sheetId}`;
        break;
      case 6:
        url = `https://a866-95-85-212-16.eu.ngrok.io/api/Church/Church/${sheetId}`;
        break;
      default:
        url = `https://a866-95-85-212-16.eu.ngrok.io/api/Outlook/Outlook/${sheetId}`;
        break;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => setResponse(Object.values(data)[0]))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    getData();
  }, [sheetId]);

  // const showRating = () => {
  //   let ratings = 0;
  //   ratingArray.map(() => {
  //     ratings++;
  //     if(ratings <= response.rating){
  //       return <MaterialIcons name='star' size={32} color='#FFD600' />
  //     }
  //     else {
  //       return <MaterialIcons name='star-border' size={32} color='#FFD600' />
  //     }
  //   })
  // }

  return (
    <Modal visible={showSheet} animationType='slide'>
      <SafeAreaView style={styles.container}>
        <View style={styles.close}>
          <Text style={styles.header}>{response && response.name}</Text>
          <TouchableOpacity onPress={() => setShowSheet(false)}>
            <MaterialIcons name='close' size={32} color='#949494' />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <ScrollView style={styles.images} horizontal={true}>
            <View style={styles.image} />
            <View style={styles.image} />
            <View style={styles.image} />
          </ScrollView>
          <View>
            <Text style={styles.text}>{response && response.description}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.rating}>
              {/* {showRating()} */}
              <MaterialIcons name='star' size={32} color='#FFD600' />
              <MaterialIcons name='star' size={32} color='#FFD600' />
              <MaterialIcons name='star' size={32} color='#FFD600' />
              <MaterialIcons name='star-half' size={32} color='#FFD600' />
              <MaterialIcons name='star-border' size={32} color='#FFD600' />
            </View>
            <TouchableOpacity style={styles.button}>
            <Text style={[styles.text, {color: '#FFF', fontSize: 18}]}>GO</Text>
          </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  close: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },
  content: {
    
  },
  header: {
    fontFamily: 'poppins-regular',
    fontSize: 24,
  },
  images: {
    marginVertical: 15
  },
  image: {
    width: 200,
    height: 200,
    backgroundColor: '#949494',
    marginRight: 5
  },
  text: {
    fontFamily: 'poppins-regular'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 40
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    borderRadius: '50%',
    backgroundColor: '#23ABDB',
    width: 150,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 
export default BottomSheet;
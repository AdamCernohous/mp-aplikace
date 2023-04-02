import { useEffect, useState, useContext } from "react";
import { Dimensions, Image, Modal, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from '../context/AuthContext';

const BottomSheet = ({showSheet, setShowSheet, sheetId, category}) => {
  const [response, setResponse] = useState(null);
  const [images, setImages] = useState(null);
  const [imageHighlight, setImageHighlight] = useState(null);
  const [activeHighlight, setActiveHighlight] = useState(0);

  const [active, setActive] = useState(0);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const [ratings, setRatings] = useState(null);
  //const [ratingsUrl, setRatingsUrl] = useState(null)
  

  const {theme} = useContext(ThemeContext);
  const {userToken} = useContext(AuthContext);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  let url = `https://aplikaceturistickedestinace.azurewebsites.net/api/Outlook/Outlook/${sheetId}`;
  let ratingsUrl = null;

  const getData = () => {
    switch(category){
      case 1:
        url = `https://aplikaceturistickedestinace.azurewebsites.net/api/Outlook/Outlook/${sheetId}`;
        ratingsUrl = `https://aplikaceturistickedestinace.azurewebsites.net/api/Outlook/OutlookRating/${sheetId}`;
        break;
      case 2:
        url = `https://aplikaceturistickedestinace.azurewebsites.net/api/Park/Park/${sheetId}`;
        ratingsUrl = `https://aplikaceturistickedestinace.azurewebsites.net/api/Park/ParkRating/${sheetId}`;
        break;
      case 3:
        url = `https://aplikaceturistickedestinace.azurewebsites.net/api/Restaurant/Restaurant/${sheetId}`;
        ratingsUrl = `https://aplikaceturistickedestinace.azurewebsites.net/api/Restaurant/RestaurantRating/${sheetId}`;
        break;
      case 4:
        url = `https://aplikaceturistickedestinace.azurewebsites.net/api/Museum/Museum/${sheetId}`;
        ratingsUrl = `https://aplikaceturistickedestinace.azurewebsites.net/api/Museum/MuseumRating/${sheetId}`;
        break;
      case 5:
        url = `https://aplikaceturistickedestinace.azurewebsites.net/api/Castle/Castle/${sheetId}`;
        ratingsUrl = `https://aplikaceturistickedestinace.azurewebsites.net/api/Castle/CasteRating/${sheetId}`;
        break;
      case 6:
        url = `https://aplikaceturistickedestinace.azurewebsites.net/api/Church/Church/${sheetId}`;
        ratingsUrl = `https://aplikaceturistickedestinace.azurewebsites.net/api/Church/ChurchRating/${sheetId}`;
        break;
      default:
        url = `https://aplikaceturistickedestinace.azurewebsites.net/api/Outlook/Outlook/${sheetId}`;
        ratingsUrl = `https://aplikaceturistickedestinace.azurewebsites.net/api/Outlook/OutlookRating/${sheetId}`;
        break;
    }

    if(sheetId !== null && sheetId !== undefined){
      console.log('sheet'+sheetId);
      console.log('url'+url);
      try{
        axios.get(url)
          .then(data => setResponse(Object.values(data.data)[0]))
          .catch(err => console.error('sheet1'+err));
      } catch(err){
        console.error(err);
      }

      try{
        axios.get('https://aplikaceturistickedestinace.azurewebsites.net/api/User/Pictures/' + sheetId)
          .then(res => setImages(Object.values(res.data)[0]))
          .catch(err => console.error('sheet2'+err));
      } catch(err){
        console.error(err);
      }
    }

    if(sheetId !== null && ratingsUrl !== null && !ratingsUrl.includes('undefined')){  
      console.log('rateUrl' + ratingsUrl);
      try{
        axios.get(ratingsUrl)
          .then(res => setRatings(Object.values(res.data)[0]))
          .catch(err => console.error('sheet3'+err));
      } catch(err){
        console.error(err);
      }
    }
  }

  const postData = () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

    switch(category){
      case 1:
        axios.post(`https://aplikaceturistickedestinace.azurewebsites.net/api/Outlook/OutlookRating/Post`, {
          stars: rating,
          comment: comment,
          outlookID: sheetId
        })
          .then(res => console.log(res))
          .catch(err => console.error(err));
        break;
      case 2:
        axios.post(`https://aplikaceturistickedestinace.azurewebsites.net/api/Park/ParkRating/Post`, {
          stars: rating,
          comment: comment,
          parkID: sheetId
        })
          .then(res => console.log(res))
          .catch(err => console.error(err));
        break;
      case 3:
        axios.post(`https://aplikaceturistickedestinace.azurewebsites.net/api/Restaurant/RestaurantRating/Post`, {
          stars: rating,
          comment: comment,
          restaurantID: sheetId
        })
          .then(res => console.log(res))
          .catch(err => console.error(err));
        break;
      case 4:
        axios.post(`https://aplikaceturistickedestinace.azurewebsites.net/api/Museum/MuseumRating/Post`, {
          stars: rating,
          comment: comment,
          museumID: sheetId
        })
          .then(res => console.log(res))
          .catch(err => console.error(err));
        break;
      case 5:
        axios.post(`https://aplikaceturistickedestinace.azurewebsites.net/api/Castle/CastleRating/Post`, {
          stars: rating,
          comment: comment,
          castleID: sheetId
        })
          .then(res => console.log(res))
          .catch(err => console.error(err));
        break;
      case 6:
        axios.post(`https://aplikaceturistickedestinace.azurewebsites.net/api/Church/ChurchRating/Post`, {
          stars: rating,
          comment: comment,
          churchID: sheetId
        })
          .then(res => console.log(res))
          .catch(err => console.error(err));
        break;
      default:
        axios.post(`https://aplikaceturistickedestinace.azurewebsites.net/api/Outlook/OutlookRating/Post`, {
          stars: rating,
          comment: comment,
          outlookID: sheetId
        })
          .then(res => console.log(res))
          .catch(err => console.error(err));
        break;
    }
  }

  const renderStar = (value) => {
    const iconName = value <= rating ? 'star' : 'star-outline';

    return (
      <TouchableOpacity onPress={() => setRating(value)}>
        <MaterialIcons name={iconName} size={32} color='gold' style={styles.star} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getData();
    console.log(response)
  }, [sheetId, showSheet === true, setResponse, setImages, setRatings, ratingsUrl]);

  useEffect(() => {
    if(images != null){
      setImageHighlight(Object.values(images)[0].bytes);
    }
  },[images]);

  const showContent = () => {
    if(active === 0){
      return(
        <View style={styles.contentContainer}>
          <View style={styles.contentHead}>
            <Text style={[styles.contentHeaderText, {color: theme ? '#000' : '#FFF'}]}>{response && response.name}</Text>
            <View style={styles.ratingContainer}>
              <MaterialIcons name='star' size={20} color='gold' style={{marginRight: 5}} />
              <Text style={[styles.ratingText, {color: theme ? '#000' : '#FFF'}]}>{response && response.rating}</Text>
            </View>
          </View>
          <Text style={[styles.description, {color: theme ? '#000' : '#FFF'}]}>{response && response.description}</Text>
        </View>
      )
    }
    else if(active === 1){
      return(
        <ScrollView style={styles.contentContainer}>
          {
            ratings && ratings.map(rating => {
              console.log('rating'+rating)
              return(
                <View style={styles.commentContainer}>
                  <View style={styles.commentHead}>
                    <Text style={[styles.ratingText, {color: theme ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)', fontSize: 16}]}>Matěj</Text>
                    <View style={styles.ratingContainer}>
                      <MaterialIcons name='star' size={20} color='gold' style={{marginRight: 5}} />
                      <Text style={[styles.ratingText, {color: theme ? '#000' : '#FFF'}]}>{rating.stars}</Text>
                    </View>
                  </View>
                  <Text style={[styles.ratingText, {color: theme ? '#000' : '#FFF', marginTop: 5}]}>{rating.comment}</Text>
                </View>
              )
            })
          }
        </ScrollView>
      )
    }
    else if(active === 2){
      return(
        <View style={styles.contentContainer}>
          <Text style={[styles.contentHeaderText, {color: theme ? '#000' : '#FFF', fontSize: 22, marginTop: 10}]}>Rate this location</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            onChangeText={text => setComment(text)}
            style={[styles.ratingInput, {borderColor: theme ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)', color: theme ? '#000' : '#FFF'}]}
          />
          <View style={styles.ratingContainer2}>
            {renderStar(1)}
            {renderStar(2)}
            {renderStar(3)}
            {renderStar(4)}
            {renderStar(5)}
          </View>
          <TouchableOpacity style={styles.ratingButton} onPress={() => postData()}>
            <Text style={styles.ratingButtonText}>Rate</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  return (
    <Modal visible={showSheet} animationType='slide'>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{position: 'relative', backgroundColor: theme ? '#FFF' : '#010101', zIndex: -3, flex: 1}}>
        {imageHighlight ? <Image source={{ uri: `data:image/jpeg;base64,${imageHighlight}` }} style={{ position: 'absolute', top: 0, left: 0, width: windowWidth, height: windowHeight/2.3, zIndex: -2}} /> : null}
        <LinearGradient
          colors={['transparent', theme ? '#FFF' : '#010101']}
          start={{ x: 0, y: .75 }}
          end={{ x: 0, y: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: windowWidth,
            height: windowHeight/2.3,
            zIndex: -1,
          }}
        />
        <SafeAreaView style={[styles.safeArea, {}]}>
          <View style={styles.nav}>
            <TouchableOpacity style={{backgroundColor: '#FFF', borderRadius: 100}} onPress={() => setShowSheet(false)}>
              <MaterialIcons name='close' size={28} color='#000' />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal={true} style={[styles.imageSelect, {marginTop: windowHeight/3.5}]}>
            {
              images && images.map((image, index) => {
                return(
                  <TouchableOpacity
                    onPress={() => {
                      setImageHighlight(image.bytes);
                      setActiveHighlight(index);
                    }}
                  >
                    <Image source={{ uri: `data:image/jpeg;base64,${image.bytes}` }} style={[styles.image, {borderColor:'#1DA1F2', borderWidth: activeHighlight === index ? 3 : 0}]} />
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
          <View style={[styles.contentNav]}>
            <TouchableOpacity onPress={() => setActive(0)} style={styles.contentNavTextContainer}>
              <Text style={[styles.contentNavText, {color: active === 0 ? '#1DA1F2' : (theme ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)')}]}>Details</Text>
              <View style={[styles.contentNavTextUnderline, {backgroundColor: active === 0 ? '#1DA1F2' : 'rgba(0,0,0,0)'}]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActive(1)} style={styles.contentNavTextContainer}>
              <Text style={[styles.contentNavText, {color: active === 1 ? '#1DA1F2' : (theme ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)')}]}>Reviews</Text>
              <View style={[styles.contentNavTextUnderline, {backgroundColor: active === 1 ? '#1DA1F2' : 'rgba(0,0,0,0)'}]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActive(2)} style={styles.contentNavTextContainer}>
              <Text style={[styles.contentNavText, {color: active === 2 ? '#1DA1F2' : (theme ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)')}]}>Rate</Text>
              <View style={[styles.contentNavTextUnderline, {backgroundColor: active === 2 ? '#1DA1F2' : 'rgba(0,0,0,0)'}]} />
            </TouchableOpacity>
          </View>
          {showContent()}
        </SafeAreaView>
      </View>
      </TouchableWithoutFeedback>       
    </Modal>
  );
}

const styles = StyleSheet.create({
  nav: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: '5%'
  },
  imageSelect: {
    marginLeft: '5%',
    paddingBottom: 10
  },
  image: {
    width: 120,
    height: 75,
    borderRadius: 10,
    marginRight: 20
  },
  contentNav: {
    marginHorizontal: '5%',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  contentNavTextContainer: {
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  contentNavText: {
    fontFamily: 'lato-regular',
    fontSize: 18
  },
  contentNavTextUnderline: {
    width: '150%',
    height: 4,
    borderRadius: 100,
    marginTop: 5
  },
  contentContainer: {
    marginHorizontal: '5%',
    marginTop: 10
  },
  contentHead: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },
  contentHeaderText: {
    fontFamily: 'lato-bold',
    fontSize: 22
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ratingText: {
    fontFamily: 'lato-regular',
    fontSize: 18
  },
  description: {
    fontFamily: 'lato-regular',
    fontSize: 16,
    marginTop: 20
  },
  ratingInput: {
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 10,
    padding: 10,
    paddingTop: 10,
    fontFamily: 'lato-regular',
    height: 150
  },
  ratingContainer2: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    width: '100%'
  },
  star: {
    marginRight: 5
  },
  ratingButton: {
    borderRadius: 100,
    width: '100%',
    backgroundColor: '#1DA1F2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 15
  },
  ratingButtonText: {
    fontFamily: 'lato-regular',
    fontSize: 18,
    color: '#FFF'
  },
  commentContainer: {
    marginBottom: 20,
    width: '90%'
  },
  commentHead: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
 
export default BottomSheet;
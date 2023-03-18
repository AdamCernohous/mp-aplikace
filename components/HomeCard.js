import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useContext } from 'react';
import home from '../assets/styles/home';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../context/ThemeContext';


const HomeCard = ({ name, rating, thumbnail }) => {
  const {theme} = useContext(ThemeContext);

  return (
      <View style={home.card}>
        <Image source={{ uri: `data:image/jpeg;base64,${thumbnail}` }} style={home.cardImage} />
        <View style={home.cardHeading}>
          <Text style={[home.cardHeader, {color: theme ? '#000' : '#FFF'}]}>{name}</Text>
          <View style={home.cardRating}>
            <MaterialIcons name='star' size={20} color='gold' style={{marginRight: 5}} />
            <Text style={[home.cardRatingText, {marginRight: 5, color: theme ? '#000' : '#FFF'}]}>{rating}</Text>
          </View>
        </View>
      </View>
  );
}

export default HomeCard;
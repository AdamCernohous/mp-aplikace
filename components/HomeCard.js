import { Image, Text, TouchableOpacity, View } from 'react-native';
import home from '../assets/styles/home';

const HomeCard = ({ name, description, rating }) => {
  return (
      <View style={home.card}>
        <View style={home.cardHeading}>
          <Text style={home.cardHeader}>{name}</Text>
          <View style={home.cardRating}>
            <Text style={home.cardRatingText}>{rating}</Text>
            <Text style={home.cardRatingText}>*</Text>
          </View>
        </View>
        <View style={home.cardImage} />
      </View>
  );
}
 
export default HomeCard;
import { Image, Text, View } from 'react-native';
import home from '../assets/styles/home';

const HomeCard = () => {
  return (
    <View style={home.card}>
      <View style={home.cardHeading}>
        <Text style={home.cardHeader}>Restaurant</Text>
        <View style={home.cardRating}>
          <Text style={home.cardRatingText}>4.4</Text>
          <Text style={home.cardRatingText}>*</Text>
        </View>
      </View>
      <View style={home.cardImage} />
    </View>
  );
}
 
export default HomeCard;
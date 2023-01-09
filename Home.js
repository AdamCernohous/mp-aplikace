import { View, Text, SafeAreaView } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import home from "./assets/styles/home";
import HomeCard from "./components/HomeCard";
import HomeSelectBtn from "./components/HomeSelectBtn";

const Home = () => {
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
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
 
export default Home;
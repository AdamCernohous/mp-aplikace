import { Modal, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BottomSheet = ({showSheet, setShowSheet, locationID}) => {
  return (
    <Modal visible={showSheet} animationType='slide'>
      <SafeAreaView style={styles.container}>
        <View style={styles.close}>
          <Text style={styles.header}>Trosky</Text>
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
            <Text style={styles.text}>
              Lorem ipsum (zkráceně lipsum) je označení
              pro standardní pseudolatinský text užívaný v
              grafickém designu a navrhování jako demonstrativní
              výplňový text při vytváření pracovních ukázek grafických
              návrhů (např. internetových stránek, rozvržení
              časopisů či všech druhů reklamních materiálů).
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.rating}>
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
    fontSize: 32,
    // color: '#949494'
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
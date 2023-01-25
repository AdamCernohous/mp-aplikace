import { StyleSheet } from "react-native";

const home = StyleSheet.create({
  container: {
    flex: 1,
    // paddingLeft: '5%',
    // paddingRight: '5%',
  },
  textInput: {
    width: '100%',
    backgroundColor: '#FFF',
    height: 45,
    borderRadius: '50%',
    paddingLeft: '7%',
    fontFamily: 'poppins-regular',
    fontSize: 18
  },
  selectContiner: {
    width: '100%',
    marginTop: 10,
    paddingLeft: '5%',
  },
  select: {
    height: 35,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: '50%',
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: .2,
    shadowOffset:{width: 0, height: 3}
  },
  text: {
    fontFamily: 'poppins-regular',
    fontSize: 15
  },
  card: {
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginBottom: 20
  },
  cardHeader: {
    fontFamily: 'poppins-regular',
    fontSize: 20
  },
  cardHeading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardRating: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardRatingText: {
    fontFamily: 'poppins-regular',
    fontSize: 20,
    color: '#FFD600'
  },
  cardImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#BABABA',
    marginTop: 10
  },
  modal: {
    height: 500,
    margin: 20
  }
});

export default home;
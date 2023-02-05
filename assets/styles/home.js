import { StyleSheet } from "react-native";

const home = StyleSheet.create({
  container: {
    flex: 1,
    // paddingLeft: '5%',
    // paddingRight: '5%',
  },
  head: {
    paddingLeft: '5%',
    paddingRight: '5%',
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profile: {
    margin: 5,
    width: 55,
    height: 55,
    //backgroundColor: '#FFF',
    borderRadius: '50%',
    borderColor: '#1DA1F2',
    borderWidth: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileCenter: {
    dispaly: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    width: '100%',
    backgroundColor: '#EEEEEE',
    height: 45,
    borderRadius: '50%',
    paddingLeft: '7%',
    fontFamily: 'lato-regular',
    fontSize: 18
  },
  selectContiner: {
    width: '100%',
    marginTop: 15,
    paddingLeft: '5%',
  },
  select: {
    position: 'relative',
    height: 35,
    paddingHorizontal: 15,
    paddingVertical: 5,
    display: 'flex',
    alignItems: 'center',
    //justifyContent: 'center',
    marginRight: 10,
  },
  selectDot: {
    bottom: -8,
    width: 5,
    height: 5,
    borderRadius: '50%',
    backgroundColor: '#1DA1F2'
  },
  text: {
    fontFamily: 'lato-regular',
    fontSize: 15
  },
  selectText: {
    fontFamily: 'lato-bold',
    fontSize: 18
  },
  card: {
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: '#EEEEEE',
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginBottom: 20
  },
  cardHeader: {
    fontFamily: 'lato-regular',
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
    fontFamily: 'lato-regular',
    fontSize: 20,
    color: '#000'
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
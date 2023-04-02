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
    borderRadius: 100,
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
    height: 45,
    borderRadius: 100,
    paddingLeft: '7%',
    fontFamily: 'lato-regular',
    fontSize: 18
  },
  selectContiner: {
    marginTop: 15,
    paddingLeft: '5%',
  },
  select: {
    height: 35,
    paddingHorizontal: 15,
    paddingVertical: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 100
  },
  selectDot: {
    bottom: -8,
    width: 5,
    height: 5,
    borderRadius: 100,
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
    marginBottom: 20,
  },
  cardHeader: {
    fontFamily: 'lato-bold',
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
    alignItems: 'center'
  },
  cardRatingText: {
    fontFamily: 'lato-regular',
    fontSize: 16,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginBottom: 10,
  },
  modal: {
    height: 500,
    margin: 20
  },
  searchContainer: {
    position: 'absolute',
    width: '90%',
    marginHorizontal: '5%',
    top: 50,
    borderRadius: 10,
    paddingBottom: 10
  },
  searchItem: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  }
});

export default home;
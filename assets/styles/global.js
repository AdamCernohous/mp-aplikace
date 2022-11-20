import { StyleSheet } from "react-native";

const global = StyleSheet.create({
  containerLogin: {
    flex: 1,
    backgroundColor: '#25BDF2',
    paddingLeft: '10%',
    paddingRight: '10%',
    display: 'flex',
    justifyContent: 'center'
  },
  titleBlack: {
    color: '#FFF',
    fontSize: 56,
    fontFamily: 'poppins-black'
  },
  text: {
    fontFamily: 'poppins-regular',
    fontSize: 16,
  },
  inputLogin: {
    borderBottomColor: '#FFF',
    borderBottomWidth: 2,
    fontSize: 20,
    padding: 5,
    color: '#FFF'
  },
  buttonLogin: {
    borderRadius: '50%',
    backgroundColor: '#FFF',
    color: '#000',
    width: 200,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  viewLogin: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '60%'
  },
});

export default global;
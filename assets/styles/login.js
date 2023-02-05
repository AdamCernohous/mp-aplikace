import { StyleSheet } from "react-native";

const global = StyleSheet.create({
  container: {
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
    fontFamily: 'lato-bold'
  },
  text: {
    fontFamily: 'lato-regular',
    fontSize: 16,
  },
  input: {
    borderBottomColor: '#FFF',
    borderBottomWidth: 2,
    fontSize: 20,
    padding: 5,
    color: '#FFF',
    marginBottom: 30
  },
  button: {
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
  view: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '60%'
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
});

export default global;
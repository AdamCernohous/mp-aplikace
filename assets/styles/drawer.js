import { StyleSheet } from "react-native";

const drawer = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '5%',
    padding: 10,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOpacity: .2,
    shadowOffset:{width: 0, height: 3},
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default drawer;
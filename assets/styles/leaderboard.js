import { StyleSheet } from "react-native";

const leaderboard = StyleSheet.create({
  container: {
    marginLeft: '7%',
    marginRight: '7%',
    marginTop: 20,
    fontFamily: 'lato-regular',
  },
  header: {
    fontSize: 32,
    marginTop: 20,
    fontFamily: 'lato-bold'
  },
  tableHead: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: '#AFAFAF',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 15,
    height: '100%'
  },
  tableItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 15
  },
  text: {
    fontFamily: 'lato-regular',
  },
  pole: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20
  },
  poleItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
});

export default leaderboard;
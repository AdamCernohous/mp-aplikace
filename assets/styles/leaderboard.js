import { StyleSheet } from "react-native";

const leaderboard = StyleSheet.create({
  container: {
    marginLeft: '7%',
    marginRight: '7%',
    marginTop: 20,
    fontFamily: 'poppins-regular',
  },
  header: {
    fontSize: 32,
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
    marginTop: 15
  },
  tableItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  text: {
    fontFamily: 'poppins-regular',
  }
});

export default leaderboard;
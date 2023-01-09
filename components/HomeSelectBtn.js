import { TouchableOpacity } from "react-native";

const HomeSelectBtn = ({children, bg, color, width, height, pH, pV}) => {
  return (
    <TouchableOpacity style={{backgroundColor: bg, borderRadius: '50%', color: color, width: width, height: height, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingHorizontal: pH, paddingVertical: pV, marginRight: 10, shadowColor: '#000', shadowOpacity: .2, shadowOffset:{width: 0, height: 3}}}>
      {children}
    </TouchableOpacity>
  );
}
 
export default HomeSelectBtn;
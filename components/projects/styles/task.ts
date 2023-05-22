import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    padding: 10,
  },

  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  bottom: {
    width: '100%',
    position: "relative",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },

  assignMemberIcon: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: Colors.light.grayNormal,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  }
})

export default styles;
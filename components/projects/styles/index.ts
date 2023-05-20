import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.light.grayNormal,
  },

  cardHeader: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#EBEBEB",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  cardBody: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  cardBodyText: {
    marginTop: 30
  }
})
import { StyleSheet } from 'react-native'
import Colors from '../../../constants/Colors'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 40,
  },

  progressText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2
  },

  progressBody: {
    flexDirection: "row",
    width: '100%',
    height: 5,
    backgroundColor: "#EBEBEB",
    borderRadius: 10,
  },

  progress: {
    height: 5,
    borderRadius: 10,
  },
})
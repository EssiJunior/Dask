import { StyleSheet } from 'react-native';

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
  }
})

export default styles;
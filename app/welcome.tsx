import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from 'react';
import Typography from "../components/text/Typography";
import Button from "../components/buttons/Button";
import { Dimensions, View, StyleSheet, Image } from "react-native";
import { CheckBox } from '@rneui/themed';
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import storage from "../storage";
import { READ_TERMS } from "../constants";
import { useActions } from "@dilane3/gx";
import {useRouter} from "expo-router" 

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const router = useRouter() 

  const [checked, setChecked] = useState(false)
  const toggleCheckbox = () => setChecked(!checked);
  // Global actions
  const { setTermsRead } = useActions('terms');

  // Handlers
  const handleContinue = async () => {
    await storage.setItem(READ_TERMS, READ_TERMS);

    setTermsRead(true);

    navigation.dispatch(CommonActions.navigate("(tabs)"));
  };
  const handleCancel = async () => {
    router.push("/signin")
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.imgContent}>
          <Image source={require('../assets/illustrations/welcome_illustration.png')} style={styles.image} />
      </View>

      <Typography text="Welcome to Dask" color={Colors.light.secondary} weight="bold" style={styles.title}/>
      <Typography text="Organize your personal tasks easily and also work with other person nicely." color={Colors.light.gray} weight="light" style={styles.paragraph}/>

      <View style={styles.agree}>
        
        <CheckBox
           checked={checked}
           onPress={toggleCheckbox}
           iconType="material-community"
           checkedIcon="checkbox-outline"
           uncheckedIcon={'checkbox-blank-outline'}
         />
        <Typography text="Agree with the " color={Colors.light.gray} weight="bold" />
        <Typography text="terms and conditions" color={Colors.light.primary} weight="bold" />
      </View>

      <Button
        width={300}
        onPress={handleCancel}
      >
        <Typography text="Cancel" color={Colors.dark.text} weight="bold" />
      </Button>

      <Button
        width={300}
        onPress={handleContinue}
      >
        <Typography text="Continue" color={Colors.dark.text} weight="bold" />

        <Ionicons
          name="arrow-forward-outline"
          size={24}
          color={Colors.dark.text}
          style={{ marginLeft: 15 }}
        />
      </Button>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems:"center",
      backgroundColor: "white",
      height: Dimensions.get('screen').height,
      width: Dimensions.get('screen').width,
  },
  image: {
      width: "90%",
      height: undefined,
      aspectRatio: 1,
  },
  imgContent: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10
  },
  title: {
    textAlign: 'center',
    fontSize: 40, 
    padding: 5,
  },
  paragraph: {
    textAlign: 'left',
    fontSize: 23, 
    paddingLeft: 20,
    paddingRight: 20,
  },
  agree: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent:'center',
      alignItems: 'center',
      margin: 30,
  },
  validation: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: "100%",
  }
})


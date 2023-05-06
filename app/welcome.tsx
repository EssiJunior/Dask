import { SafeAreaView } from "react-native-safe-area-context";
import Typography from "../components/text/Typography";
import Button from "../components/buttons/Button";
import { Dimensions } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import storage from "../storage";
import { READ_TERMS } from "../constants";
import { useActions } from "@dilane3/gx";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  // Global actions
  const { setTermsRead } = useActions('terms');

  // Handlers
  const handleContinue = async () => {
    await storage.setItem(READ_TERMS, READ_TERMS);

    setTermsRead(true);

    navigation.dispatch(CommonActions.navigate("(tabs)"));
  };

  return (
    <SafeAreaView>
      {/* 
        Todo: Add welcome screen here
      */}

      <Button
        width={200}
        style={{ marginTop: 20, marginLeft: 20 }}
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

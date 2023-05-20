import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Typography from "../components/text/Typography";
import Button from "../components/buttons/Button";
import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { CheckBox } from "@rneui/themed";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import storage, { initDBSchema } from "../storage";
import { READ_TERMS } from "../constants";
import { useActions } from "@dilane3/gx";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

export default function WelcomeScreen() {
  const router = useRouter();

  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Global actions
  const { setTermsRead } = useActions("terms");

  // Use Effect
  useEffect(() => {
    const initializeDbSchema = async () => {
      // Initialize the database schema
      await initDBSchema();

      setLoading(false);

      router.replace("/");
    };

    if (loading) {
      initializeDbSchema();
    }
  }, [loading]);

  // Handlers
  const toggleCheckbox = () => setChecked(!checked);

  const handleContinue = async () => {
    await storage.setItem(READ_TERMS, READ_TERMS);

    setTermsRead(true);
    setLoading(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: "center" }}>
        <View style={styles.imgContent}>
          <Image
            source={require("../assets/illustrations/welcome_illustration.png")}
            style={styles.image}
          />
        </View>

        <Typography
          text="Welcome to Dask"
          color={Colors.light.secondary}
          weight="bold"
          style={styles.title}
        />
        <Typography
          text="Organize your personal tasks easily and also work with other person nicely."
          color={Colors.light.gray}
          weight="light"
          style={styles.paragraph}
        />

        <View style={styles.agree}>
          <CheckBox
            iconType="material-community"
            checked={checked}
            onPress={toggleCheckbox}
            checkedIcon="checkbox-outline"
            uncheckedIcon={"checkbox-blank-outline"}
          />

          <Typography
            text="Agree with the "
            color={Colors.light.gray}
            weight="bold"
          />
          <Typography
            text="terms and conditions"
            color={Colors.light.primary}
            weight="bold"
          />
        </View>

        <Button
          width={200}
          onPress={handleContinue}
          disabled={!checked}
          style={{ marginBottom: 30 }}
        >
          {loading ? (
            <ActivityIndicator size={25} color={Colors.light.background} />
          ) : (
            <>
              <Typography
                text="Continue"
                color={Colors.dark.text}
                weight="bold"
              />

              <Ionicons
                name="arrow-forward-outline"
                size={24}
                color={Colors.dark.text}
                style={{ marginLeft: 15 }}
              />
            </>
          )}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
  },
  image: {
    width: "80%",
    height: undefined,
    aspectRatio: 1,
  },
  imgContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 35,
    padding: 5,
  },
  paragraph: {
    textAlign: "center",
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  agree: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 30,
  },
  validation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
});

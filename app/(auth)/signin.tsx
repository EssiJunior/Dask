import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Typography from "../../components/text/Typography";
import Button from "../../components/buttons/Button";
import { Dimensions, View, StyleSheet, Image, Pressable } from "react-native";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import storage from "../../storage";
import { READ_TERMS } from "../../constants";
import { useActions } from "@dilane3/gx";
import { useRouter } from "expo-router";
import TextInput from "../../components/inputs/TextInput";

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  // Handlers
  const signUp = async () => {
    router.push("/signup");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Typography
        text="Sign In"
        color={Colors.light.secondary}
        weight="bold"
        style={styles.title}
      />

      <View style={styles.inputsContainer}>
        <TextInput placeholder="Email" style={styles.inputs} />
        <TextInput
          placeholder="Password"
          style={styles.inputs}
          secured={true}
        />
      </View>

      <View style={styles.otherMethods}>
        <View style={styles.divider}>
          <Typography
            text="or"
            color={Colors.light.gray}
            weight="bold"
            style={styles.onDivider}
          />
        </View>

        <Button
          type="outlined"
          color={Colors.light.grayNormal}
          style={styles.google}
        >
          <Image
            source={require("../../assets/images/google.png")}
            style={styles.image}
          />
          <Typography
            text="Sign In with Google"
            color={Colors.light.gray}
            weight="bold"
            style={styles.textGoogle}
          />
        </Button>
      </View>
      <View style={styles.validation}>
        <Button
          width={100}
          // onPress={handleCancel}
          type={"text"}
          style={{ backgroundColor: Colors.light.grayLight }}
        >
          <Typography
            text="Cancel"
            color={Colors.light.secondary}
            weight="bold"
          />
        </Button>

        <Button
          width={200}
          // onPress={handleSignIn}
        >
          <Typography text="Sign In" color={Colors.dark.text} weight="bold" />
        </Button>
      </View>

      <Pressable onPress={() => signUp()} style={{ width: "80%" }}>
        <Typography
          text="Don't have an account? "
          color={Colors.light.primary}
          weight="bold"
          style={{ width: "100%" }}
        />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: Colors.light.background,
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
  },
  inputsContainer: {
    width: "100%",
  },
  inputs: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
    width: "100%",
  },
  otherMethods: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 30,
    width: "100%",
  },
  divider: {
    backgroundColor: Colors.light.grayNormal,
    width: "90%",
    height: 2,
    marginBottom: 30,
    marginTop: 30,
    position: "relative",
  },
  onDivider: {
    position: "absolute",
    top: -15,
    left: "30%",
    right: "30%",
    backgroundColor: "white",
    textAlign: "center",
    paddingLeft: 5,
    paddingRight: 5,
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    padding: 5,
    marginTop: 50,
    marginBottom: 50,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  google: {
    width: "80%",
    margin: 30,
  },
  textGoogle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  validation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
});

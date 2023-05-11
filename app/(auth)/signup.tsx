import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Typography from "../../components/text/Typography";
import Button from "../../components/buttons/Button";
import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import storage from "../../storage";
import { READ_TERMS } from "../../constants";
import { useActions } from "@dilane3/gx";
import { useRouter } from "expo-router";
import TextInput from "../../components/inputs/TextInput";
import { ScrollView } from "react-native-gesture-handler";

export default function SignUp() {
  const router = useRouter();

  // Handlers
  const signIn = async () => {
    router.push("/signin");
  };

  const handleCancel = () => {
    router.replace("/");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        <Typography
          text="Sign Up"
          color={Colors.light.secondary}
          weight="bold"
          style={styles.title}
        />

        <View style={styles.inputsContainer}>
          <TextInput placeholder="Name" style={styles.inputs} pv={10} />
          <TextInput placeholder="Email" style={styles.inputs} pv={10} />
          <TextInput
            placeholder="Password"
            style={styles.inputs}
            secured={true}
            pv={10}
          />
        </View>

        {/* <View style={styles.otherMethods}>
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
        </View> */}

        <View style={styles.validation}>
          <Button
            width={120}
            onPress={handleCancel}
            color={Colors.light.grayLight}
            pv={12}
          >
            <Typography
              text="Cancel"
              color={Colors.light.secondary}
              weight="bold"
            />
          </Button>

          <Button
            width={Dimensions.get('window').width - 180}
            // onPress={handleSignUp}
            pv={12}
          >
            <Typography text="Sign Up" color={Colors.dark.text} weight="bold" />
          </Button>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          <Typography
            text="Already have an account ?"
            color={Colors.light.black}
            weight="bold"
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => signIn()}
            style={{ marginLeft: 5 }}
          >
            <Typography
              text="Sign In"
              color={Colors.light.primary}
              weight="bold"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  inputsContainer: {
    width: "100%",
  },
  inputs: {
    marginBottom: 10,
    marginTop: 10,
    width: "100%",
  },
  otherMethods: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
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
  },
  title: {
    textAlign: "center",
    fontSize: 35,
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 30,
  },
});

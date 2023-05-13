import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Typography from "../../components/text/Typography";
import Button from "../../components/buttons/Button";
import {
  Dimensions,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useActions } from "@dilane3/gx";
import { useRouter } from "expo-router";
import TextInput from "../../components/inputs/TextInput";
import { ScrollView } from "react-native-gesture-handler";
import TouchableSurface from "../../components/buttons/TouchableSurface";
import { object, string } from "yup";
import { createUser } from "../../api/auth";
import { sleep } from "../../utils";

let schema = object({
  name: string().min(2).max(20).required(),
  email: string().email().required(),
  password: string().min(6).required(),
});

export default function SignUp() {
  const router = useRouter();

  //   Local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  //   UseEffects
  useEffect(() => {
    if (success) {
      sleep(1000).then(() => {
        router.replace("/");
      });
    }
  }, [success]);

  // Handlers
  const signIn = async () => {
    router.push("/signin");
  };

  const handleCancel = () => {
    router.replace("/");
  };

  const handleChange = (value: string, name: string) => {
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "name") setName(value);
  };

  const handleSeePassword = () => {
    setSeePassword(!seePassword);
  };

  const handleSubmit = async () => {
    const { value, error: checkError } = await checkForm();

    if (value) {
      setLoading(true);

      const { data, error } = await createUser({ name, email, password });

      if (error) {
        console.log(error);
      } else {
        console.log(data);
        setSuccess(true);
      }

      setLoading(false);
    } else {
      console.log(checkError);
    }
  };

  const checkForm = async () => {
    try {
      const value = await schema.validate({ name, email, password });

      return { value };
    } catch (err: any) {
      return { error: err.message };
    }
  };

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
          <TextInput
            value={name}
            onChange={(value) => handleChange(value, "name")}
            placeholder="Name"
            style={styles.inputs}
            pv={10}
          />
          <TextInput
            value={email}
            onChange={(value) => handleChange(value, "email")}
            placeholder="Email"
            style={styles.inputs}
            pv={10}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextInput
              value={password}
              onChange={(value) => handleChange(value, "password")}
              placeholder="Password"
              style={styles.inputs}
              secured={!seePassword}
              pv={10}
              width="100%"
            />

            <TouchableSurface
              style={{
                position: "absolute",
                right: 15,
                top: 20,
                width: 30,
                height: 30,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
              rounded
              onPress={handleSeePassword}
            >
              <Ionicons
                name={seePassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color={Colors.light.gray}
              />
            </TouchableSurface>
          </View>
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
            width={Dimensions.get("window").width - 180}
            // onPress={handleSignUp}
            pv={12}
            onPress={handleSubmit}
            disabled={loading}
            color={success ? Colors.light.green : Colors.light.primary}
          >
            {loading ? (
              <ActivityIndicator color={Colors.dark.text} size={23} />
            ) : success ? (
              <Ionicons
                name="checkmark-outline"
                size={22}
                color={Colors.dark.text}
              />
            ) : (
              <Typography
                text="Sign Up"
                color={Colors.dark.text}
                weight="bold"
              />
            )}
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

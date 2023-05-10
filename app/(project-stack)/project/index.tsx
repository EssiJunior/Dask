import { SafeAreaView } from "react-native-safe-area-context";
import HeaderText from "../../../components/layouts/headers/HeaderText";
import Colors from "../../../constants/Colors";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Typography from "../../../components/text/Typography";
import TextInput from "../../../components/inputs/TextInput";
import Button from "../../../components/buttons/Button";
import { useRouter } from "expo-router";

export default function CreateProject() {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <HeaderText title="Create Project" />

      <View style={styles.container}>
        <View style={styles.inputsBox}>
          <TextInput value="Buy a food " placeholder="Title" />
          <TextInput value="More description" numberOfLines={7} />
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            width={130}
            pv={15}
            color={Colors.light.grayLight}
            onPress={handleCancel}
          >
            <Typography
              text="Cancel"
              color={Colors.light.primary}
              weight="semibold"
            />
          </Button>

          <Button width={Dimensions.get("screen").width - 180} pv={15}>
            <Typography
              text="Create"
              color={Colors.light.grayLight}
              weight="semibold"
            />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  inputsBox: {
    gap: 20,
    marginTop: 50,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 35,
  },
});

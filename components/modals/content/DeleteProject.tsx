import { StyleSheet, View } from "react-native";
import Colors from "../../../constants/Colors";
import Button from "../../buttons/Button";
import Typography from "../../text/Typography";

export default function DeleteProject() {
  return (
    <View style={styles.container}>
      <Typography
        text="Delete Project"
        fontSize={24}
        weight="bold"
        color={Colors.light.secondary}
      />
      <Typography
        text="Are you sure you want to delete this project?"
        fontSize={16}
        color={Colors.light.black}
        style={{ marginTop: 16 }}
      />

      <View style={{ flexDirection: "row", marginTop: 32 }}>
        <Button width={100} type="text" style={{ marginRight: 20 }}>
          <Typography text="Cancel" fontSize={16} weight="semibold" color={Colors.light.black} />
        </Button>

        <Button width={120} color={Colors.light.error}>
          <Typography text="Delete" fontSize={16} weight="semibold" color={Colors.dark.text} />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
});

import { View } from "react-native";
import Typography from "../text/Typography";
import { styles } from "./styles";

export default function ProgressBar() {
  return (
    <View style={styles.container}>
      <View style={styles.progressText}>
        <Typography
          text="0/0"
          fontSize={14}
          weight="light"
          style={{ marginLeft: "auto" }}
        />
      </View>

      <View style={styles.progressBody}>
        <View style={styles.progress} />
      </View>
    </View>
  );
}

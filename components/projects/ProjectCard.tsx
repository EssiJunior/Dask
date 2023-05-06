import { View } from "react-native";
import Colors from "../../constants/Colors";
import Avatar from "../avatars/Avatar";
import TouchableSurface from "../buttons/TouchableSurface";
import ProgressBar from "../progress/ProgressBar";
import Typography from "../text/Typography";
import { styles } from "./styles";

export default function ProjectCard() {
  return (
    <TouchableSurface style={{ marginBottom: 20 }}>
      <View style={styles.container}>
        <View style={styles.cardHeader}>
          <View
            style={{
              position: "absolute",
              bottom: -25,
              left: 20,
            }}
          >
            <Avatar
              size={50}
              rounded={false}
              borderWidth={2}
              borderColor={Colors.light.background}
            />
          </View>
        </View>

        <View style={styles.cardBody}>
          <View
            style={{
              position: "absolute",
              top: 10,
              right: 20,
            }}
          >
            <Avatar size={30} />
          </View>

          <View style={styles.cardBodyText}>
            <Typography
              text="Project Name"
              weight="bold"
              fontSize={20}
              color={Colors.light.black}
            />
            <Typography text="Since yesterday" weight="light" fontSize={14} />
          </View>

          <ProgressBar />
        </View>
      </View>
    </TouchableSurface>
  );
}

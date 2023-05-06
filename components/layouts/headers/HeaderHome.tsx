import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "../../avatars/Avatar";
import styles from "./styles";
import TouchableSurface from "../../buttons/TouchableSurface";
import Colors from "../../../constants/Colors";
import Dot from "../../dot/Dot";

export default function HeaderHome() {
  return (
    <View style={styles.header}>
      <Avatar />

      <View style={styles.headerIcons}>
        <TouchableSurface rounded style={{ borderRadius: 50 }}>
          <Ionicons name="search-outline" size={24} color={Colors.light.gray} />
        </TouchableSurface>

        <TouchableSurface rounded style={{ borderRadius: 50 }}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={Colors.light.gray}
          />

          <Dot
            size={10}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              borderWidth: 2,
              borderColor: Colors.light.background,
            }}
          />
        </TouchableSurface>
      </View>
    </View>
  );
}

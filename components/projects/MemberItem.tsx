import TouchableSurface from "../buttons/TouchableSurface";
import { View } from "react-native";
import styles from "./styles/member";
import Typography from "../text/Typography";
import Colors from "../../constants/Colors";
import Avatar from "../avatars/Avatar";

export default function MemberItem() {
  return (
    <TouchableSurface
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Avatar size={50} />

          <View
            style={{
              marginLeft: 10,
            }}
          >
            <Typography
              text="John Doe"
              color={Colors.light.black}
              fontSize={18}
              weight="bold"
            />
            <Typography
              text="john@gmail.com"
              color={Colors.light.gray}
              fontSize={14}
            />
          </View>
        </View>

        <Typography
          text="owner"
          style={{ alignSelf: "flex-start" }}
          fontSize={14}
          weight="semibold"
        />
      </View>
    </TouchableSurface>
  );
}

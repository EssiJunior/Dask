import { View } from "react-native";
import Colors from "../../constants/Colors";
import Typography from "../text/Typography";
import styles from "./styles";

type BadgeProps = {
  padding: number;
  color: string;
  fontSize: number;
  text: string;
  width: number;
};

export default function Badge({
  padding,
  color,
  fontSize,
  text,
  width,
}: BadgeProps) {
  return (
    <View style={[styles.badge, { padding, backgroundColor: color, width }]}>
      <Typography
        text={text}
        color={Colors.dark.text}
        fontSize={fontSize}
        weight="semibold"
        style={{
          paddingTop: -2,
        }}
      />
    </View>
  );
}

Badge.defaultProps = {
  padding: 2,
  color: Colors.light.primary,
  fontSize: 12,
  width: 20,
};

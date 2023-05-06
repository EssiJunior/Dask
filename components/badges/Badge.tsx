import { View } from "react-native";
import Colors from "../../constants/Colors";
import Typography from "../text/Typography";
import styles from "./styles";

type BadgeProps = {
  padding: number;
  color: string;
  textColor: string;
  fontSize: number;
  text: string;
  width: number;
};

export default function Badge({
  padding,
  color,
  textColor,
  fontSize,
  text,
  width,
}: BadgeProps) {
  return (
    <View style={[styles.badge, { padding, backgroundColor: color, width }]}>
      <Typography
        text={text}
        color={textColor}
        fontSize={fontSize}
        weight="semibold"
      />
    </View>
  );
}

Badge.defaultProps = {
  padding: 2,
  color: Colors.light.primary,
  textColor: Colors.dark.text,
  fontSize: 12,
  width: 20,
};

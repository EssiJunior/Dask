import { TouchableNativeFeedback, View, Text } from "react-native";
import Colors from "../../constants/Colors";
import styles from "./styles";

type ButtonProps = {
  onPress?: () => void;
  children: React.ReactNode;
  color?: string;
  type?: "contained" | "outlined";
};

export default function Button({ onPress, children, color }: ButtonProps) {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple(Colors.light.primaryLight, false)}
    >
      <View style={[styles.button]}>{children}</View>
    </TouchableNativeFeedback>
  );
}

Button.defaultProps = {
  color: "#000",
  type: "contained",
  onPress: () => {},
};

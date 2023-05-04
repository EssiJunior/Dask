import { TouchableNativeFeedback, View, Text } from "react-native";
import Colors from "../../constants/Colors";
import styles from "./styles";

type ButtonProps = {
  onPress?: () => void;
  children: React.ReactNode;
  style: object;
  rippleColor: string;
  useForeground?: boolean;
};

export default function TouchableSurface({
  onPress,
  children,
  style,
  rippleColor,
  useForeground
}: ButtonProps) {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple(
        rippleColor,
        false
      )}
      useForeground={useForeground}
    >
      <View style={[styles.touchableSurface, style]}>{children}</View>
    </TouchableNativeFeedback>
  );
}

TouchableSurface.defaultProps = {
  onPress: () => {},
  rippleColor: Colors.light.primaryLight,
  style: {},
  useForground: false,
};

import { TouchableNativeFeedback, View, Text } from "react-native";
import Colors from "../../constants/Colors";
import styles from "./styles";

type ButtonProps = {
  onPress?: () => void;
  children: React.ReactNode;
  style: object;
  rippleColor: string;
  useForeground?: boolean;
  rounded: boolean;
  disabled?: boolean;
};

export default function TouchableSurface({
  onPress,
  children,
  style,
  rippleColor,
  useForeground,
  rounded,
  disabled,
}: ButtonProps) {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple(
        rippleColor,
        rounded
      )}
      useForeground={useForeground}
      disabled={disabled}
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
  rounded: false,
  disabled: false
};

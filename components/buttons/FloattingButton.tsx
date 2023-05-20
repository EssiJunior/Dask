import Button, { ButtonProps } from "./Button";
import { View } from "react-native";
import Animated from "react-native-reanimated"

type FloatingButtonProps = ButtonProps & {
  bottom?: number;
  right?: number;
  top?: number;
  left?: number;
};

export default function FloatingButton({
  children,
  bottom,
  right,
  top,
  left,
  ...props
}: FloatingButtonProps) {
  return (
    <View
      style={{
        position: "absolute",
        bottom,
        right,
        top,
        left
      }}
    >
      <Button {...props} elevation={5}>{children}</Button>
    </View>
  );
}

FloatingButton.defaultProps = {
  bottom: undefined,
  right: undefined,
  top: undefined,
  left: undefined,
};

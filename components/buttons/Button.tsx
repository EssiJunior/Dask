import { View } from "react-native";
import Colors from "../../constants/Colors";
import TouchableSurface from "./TouchableSurface";

export type ButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
  color?: string;
  rippleColor?: string;
  disabled?: boolean;
  textColor?: string;
  type?: "contained" | "outlined" | "text";
  rounded?: boolean;
  width?: number;
  style: object;
  pv?: number;
  ph?: number;
  elevation?: number;
};

const Button = ({
  children,
  onPress,
  color,
  disabled,
  textColor,
  type,
  rounded,
  rippleColor,
  width,
  style,
  pv,
  ph,
  elevation,
}: ButtonProps) => {
  return (
    <View
      style={[
        {
          backgroundColor: type === "contained" ? color : "transparent",
          borderColor: type === "outlined" ? color : "transparent",
          borderWidth: type === "outlined" ? 2 : 0,
          borderRadius: rounded ? 50 : 8,
          opacity: disabled ? 0.7 : 1,
          width,
          elevation,
        },
        style,
      ]}
    >
      <TouchableSurface
        onPress={onPress}
        rippleColor={rippleColor}
        useForeground
        disabled={disabled}
      >
        <View
          style={{
            flexDirection: "row",
            paddingVertical: pv,
            paddingHorizontal: ph,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </View>
      </TouchableSurface>
    </View>
  );
};

export default Button;

Button.defaultProps = {
  onPress: () => {},
  color: Colors.light.primary,
  rippleColor: Colors.light.primaryLight,
  disabled: false,
  textColor: Colors.light.text,
  type: "contained",
  rounded: false,
  width: "auto",
  style: {},
  pv: 10,
  ph: 20,
  elevation: 0,
};

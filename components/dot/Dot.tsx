import { View } from "react-native";
import Colors from "../../constants/Colors";

type DotProps = {
  size: number;
  color: string;
  style: object;
};

export default function Dot({ size, color, style }: DotProps) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: 50,
          backgroundColor: color,
        },
        style,
      ]}
    />
  );
}

Dot.defaultProps = {
  size: 8,
  color: Colors.light.red,
  style: {},
};

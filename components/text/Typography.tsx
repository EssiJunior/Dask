import { Text } from "react-native";
import Colors from "../../constants/Colors";

type TypographyProps = {
  text: string;
  fontSize?: number;
  color?: string;
  weight?: "bold" | "normal" | "light" | "black" | "semibold";
  style?: object;
  lineHeight?: number;
};

export default function Typography({
  text,
  fontSize,
  color,
  weight,
  style,
  lineHeight
}: TypographyProps) {
  // Handlers
  const getFontFamily = () => {
    switch (weight) {
      case "bold":
        return "TitilliumBold";
      case "normal":
        return "TitilliumRegular";
      case "light":
        return "TitilliumLight";
      case "black":
        return "TitilliumBlack";
      case "semibold":
        return "TitilliumMedium";
      default:
        return "TitilliumRegular";
    }
  };

  return (
    <Text
      style={[
        {
          fontSize,
          color,
          fontFamily: getFontFamily(),
          verticalAlign: "middle",
          lineHeight
        },
        style,
      ]}
    >
      {text}
    </Text>
  );
}

Typography.defaultProps = {
  fontSize: 16,
  color: Colors.light.text,
  weight: "normal",
  style: {},
};

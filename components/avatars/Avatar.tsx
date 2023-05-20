import { Image, ImageSourcePropType, View } from "react-native";
import Typography from "../text/Typography";
import { capitalize } from "../../utils/index";

const image = require("../../assets/images/image1.jpeg");

const randomUriImage = "https://picsum.photos/200/300";

export type AvatarProps = {
  source: string;
  size: number;
  style?: object;
  rounded?: boolean;
  borderWidth?: number;
  borderColor?: string;
  letter?: string;
  bgColor?: string;
};

export default function Avatar({
  size,
  style,
  rounded,
  source,
  borderWidth,
  borderColor,
  letter,
  bgColor,
}: AvatarProps) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: rounded ? 200 : 8,
          borderWidth,
          borderColor,
          backgroundColor: bgColor,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
      // rounded
    >
      {source ? (
        <Image
          source={{ uri: randomUriImage }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: rounded ? 200 : 8,
          }}
        />
      ) : (
        <Typography
          text={capitalize(letter || "D")}
          color="white"
          fontSize={size / 3}
          weight="bold"
        />
      )}
    </View>
  );
}

Avatar.defaultProps = {
  size: 40,
  rounded: true,
  source: "",
  borderWidth: 0,
  borderColor: "transparent",
  letter: "D",
  bgColor: "transparent",
};

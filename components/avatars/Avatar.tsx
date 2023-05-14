import { Image, ImageSourcePropType, View } from "react-native";

const image = require("../../assets/images/image1.jpeg");

const randomUriImage = "https://picsum.photos/200/300";

export type AvatarProps = {
  source: string;
  size: number;
  style?: object;
  rounded?: boolean;
  borderWidth?: number;
  borderColor?: string;
};

export default function Avatar({
  size,
  style,
  rounded,
  source,
  borderWidth,
  borderColor,
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
        },
        style,
      ]}
      // rounded
    >
      <Image
        source={{ uri: randomUriImage }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: rounded ? 200 : 8,
        }}
      />
    </View>
  );
}

Avatar.defaultProps = {
  size: 40,
  rounded: true,
  source: image,
  borderWidth: 0,
  borderColor: "transparent",
};

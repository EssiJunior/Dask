import { Image, ImageSourcePropType } from "react-native";
import TouchableSurface from "../buttons/TouchableSurface";

const image = require("../../assets/images/image1.jpeg");

type AvatarProps = {
  source: ImageSourcePropType;
  size: number;
  onPress?: () => void;
  style?: object;
  rounded?: boolean;
};

export default function Avatar({
  size,
  onPress,
  style,
  rounded,
  source,
}: AvatarProps) {
  return (
    <TouchableSurface
      style={[
        {
          width: size,
          height: size,
          borderRadius: rounded ? 200 : 8,
        },
        style,
      ]}
      onPress={onPress}
    >
      <Image
        source={source}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: rounded ? 200 : 8,
        }}
      />
    </TouchableSurface>
  );
}

Avatar.defaultProps = {
  size: 40,
  rounded: true,
  source: image,
};

import { ImageSourcePropType, View } from "react-native";
import Avatar, { AvatarProps } from "./Avatar";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Typography from "../text/Typography";
import { useMemo } from "react";

const image = require("../../assets/images/image1.jpeg");
const image2 = require("../../assets/images/image2.jpeg");
const image3 = require("../../assets/images/image3.jpg");
const image4 = require("../../assets/images/image4.jpg");
const image5 = require("../../assets/images/image5.jpeg");
const image6 = require("../../assets/images/image6.jpg");
const image7 = require("../../assets/images/image7.jpeg");

type MultiAvatarsProps = AvatarProps & {
  size?: number;
  sources?: string[];
};

export default function MultiAvatars({
  size,
  source,
  sources,
  ...props
}: MultiAvatarsProps) {
  const avatars = sources || [];

  const hasMore = useMemo(() => avatars.length > 3, [sources]);

  return (
    <View style={styles.container}>
      {hasMore && (
        <View
          style={[
            styles.avatarItem,
            {
              zIndex: avatars.length,
              right: 0,
            },
          ]}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: size,
              height: size,
              borderRadius: size,
              backgroundColor: Colors.light.background,
              borderWidth: 1,
              borderColor: Colors.light.grayNormal,
            }}
          >
            {/* <Ionicons name="add" size={size - 8} color={Colors.light.gray} /> */}
            <Typography text={`+${avatars.length - 3}`} fontSize={12} />
          </View>
        </View>
      )}

      {avatars.map((avatar, index) => (
        <View
          key={index}
          style={[
            styles.avatarItem,
            {
              zIndex: -index + 1,
              right: (index + 1) * 20,
            },
          ]}
        >
          <Avatar source={avatar} {...props} size={size} />
        </View>
      ))}
    </View>
  );
}

MultiAvatars.defaultProps = {
  size: 30,
  rounded: true,
  source: image,
  borderWidth: 0,
  borderColor: "transparent",
};

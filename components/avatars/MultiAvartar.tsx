import { View } from "react-native";
import Avatar, { AvatarProps } from "./Avatar";
import styles from "./styles";
import Colors from "../../constants/Colors";
import Typography from "../text/Typography";
import { useMemo } from "react";
import User from "../../entities/user";

const image = "https://picsum.photos/200/300";

type MultiAvatarsProps = AvatarProps & {
  size?: number;
  sources?: User[];
};

export default function MultiAvatars({
  size,
  source,
  sources,
  ...props
}: MultiAvatarsProps) {
  const users = sources || [];

  const hasMore = useMemo(() => users.length > 3, [sources]);

  const gap = () => {
    return hasMore ? 1 : 0;
  };

  return (
    <View style={styles.container}>
      {hasMore && (
        <View
          style={[
            styles.avatarItem,
            {
              zIndex: users.length,
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
            <Typography text={`+${users.length - 3}`} fontSize={12} />
          </View>
        </View>
      )}

      {users.splice(0, 3).map((user, index) => (
        <View
          key={user.uid}
          style={[
            styles.avatarItem,
            {
              zIndex: -index + gap(),
              right: (index + gap()) * 20,
            },
          ]}
        >
          <Avatar
            source={user.avatar}
            {...props}
            size={size}
            bgColor={user.color || "blue"}
            letter={user.name[0]}
          />
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

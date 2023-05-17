import TouchableSurface from "../buttons/TouchableSurface";
import { View } from "react-native";
import styles from "./styles/member";
import Typography from "../text/Typography";
import Colors from "../../constants/Colors";
import Avatar from "../avatars/Avatar";
import User from "../../entities/user";
import { capitalize } from '../../utils/index';

type MemberItemProps = {
  member: User
};

export default function MemberItem({ member }: MemberItemProps) {
  return (
    <TouchableSurface
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Avatar size={50} bgColor={member.color || "blue"} letter={member.name[0]} />

          <View
            style={{
              marginLeft: 10,
            }}
          >
            <Typography
              text={capitalize(member.name)}
              color={Colors.light.black}
              fontSize={18}
              weight="bold"
            />
            <Typography
              text={member.email}
              color={Colors.light.gray}
              fontSize={14}
            />
          </View>
        </View>

        <Typography
          text="member"
          style={{ alignSelf: "flex-start" }}
          fontSize={14}
          weight="semibold"
        />
      </View>
    </TouchableSurface>
  );
}

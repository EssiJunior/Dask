import TouchableSurface from "../buttons/TouchableSurface";
import { View } from "react-native";
import styles from "./styles/member";
import Typography from "../text/Typography";
import Colors from "../../constants/Colors";
import Avatar from "../avatars/Avatar";
import User from "../../entities/user";
import { capitalize } from "../../utils/index";

type MemberItemProps = {
  member: User;
  owner?: User | null;
  type: string;
  disabled?: boolean;
  onPress?: () => void
};

export default function MemberItem({
  member,
  type,
  disabled,
  owner,
  onPress
}: MemberItemProps) {
  return (
    <TouchableSurface
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Avatar
            size={50}
            bgColor={member.color || "blue"}
            letter={member.name[0]}
          />

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

        {type === "members" && (
          <Typography
            text={member.uid === owner?.uid ? "Owner" : "Member"}
            style={{ alignSelf: "flex-start" }}
            fontSize={14}
            weight="semibold"
          />
        )}
      </View>
    </TouchableSurface>
  );
}

MemberItem.defaultProps = {
  type: "members",
};

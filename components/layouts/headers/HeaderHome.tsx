import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "../../avatars/Avatar";
import styles from "./styles";
import TouchableSurface from "../../buttons/TouchableSurface";
import Colors from "../../../constants/Colors";
import Dot from "../../dot/Dot";
import Button from "../../buttons/Button";
import Typography from "../../text/Typography";
import { useRouter } from "expo-router";
import { useActions, useSignal } from "@dilane3/gx";
import { UserDataType } from "../../../gx/signals";
import Badge from "../../badges/Badge";

export default function HeaderHome() {
  const router = useRouter();

  // Global state
  const { user } = useSignal<UserDataType>("currentUser");
  const { show: toast } = useActions("toast");

  // Some handlers
  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleToast = () => {
    toast({ message: "Hello world", type: "info" });
  };

  return (
    <View style={styles.header}>
      {user ? (
        <TouchableSurface onPress={() => handleNavigate("/profile")}>
          <Avatar
            bgColor={user.color || Colors.light.primary}
            letter={user.name[0]}
          />
        </TouchableSurface>
      ) : (
        <Button type="text" ph={10} onPress={() => handleNavigate("/signin")}>
          <Ionicons
            name="person-outline"
            size={20}
            color={Colors.light.secondary}
            style={{ marginRight: 5 }}
          />
          <Typography
            fontSize={18}
            text="Sign in"
            color={Colors.light.secondary}
            weight="semibold"
          />
        </Button>
      )}

      <View style={styles.headerIcons}>
        <TouchableSurface
          rounded
          style={{ borderRadius: 50 }}
          onPress={handleToast}
          disabled
        >
          <Ionicons
            name="search-outline"
            size={24}
            color={Colors.light.grayNormal}
          />

          <View
            style={{
              position: "absolute",
              top: -15,
              right: -10,
            }}
          >
            <Badge width={25} text="soon" fontSize={8} padding={0} />
          </View>
        </TouchableSurface>

        <TouchableSurface rounded style={{ borderRadius: 50 }} disabled>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={Colors.light.grayNormal}
          />

          {/* <Dot
            size={10}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              borderWidth: 2,
              borderColor: Colors.light.background,
            }}
          /> */}

          <View
            style={{
              position: "absolute",
              top: -15,
              right: -10,
            }}
          >
            <Badge width={25} text="soon" fontSize={8} padding={0} />
          </View>
        </TouchableSurface>
      </View>
    </View>
  );
}

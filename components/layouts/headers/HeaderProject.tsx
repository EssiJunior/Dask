import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "../../avatars/Avatar";
import styles from "./styles";
import TouchableSurface from "../../buttons/TouchableSurface";
import Colors from "../../../constants/Colors";
import MultiAvatars from "../../avatars/MultiAvartar";
import { useRouter } from "expo-router";
import Typography from "../../text/Typography";

export default function HeaderProject() {
  const router = useRouter();

  // Some handlers
  const handleNavigateToMembers = () => {
    router.push("/project/members");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={styles.header}>
      <TouchableSurface
        rounded
        style={{
          borderRadius: 50,
          width: 30,
          height: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={handleGoBack}
        useForeground
      >
        <Ionicons
          name="chevron-back-outline"
          size={24}
          color={Colors.light.gray}
        />
      </TouchableSurface>

      <TouchableSurface useForeground onPress={handleNavigateToMembers}>
        <MultiAvatars />
      </TouchableSurface>
      {/* <Typography text="Hello" /> */}
    </View>
  );
}

import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "../../avatars/Avatar";
import styles from "./styles";
import TouchableSurface from "../../buttons/TouchableSurface";
import Colors from "../../../constants/Colors";
import MultiAvatars from "../../avatars/MultiAvartar";
import { useRouter } from "expo-router";
import Typography from "../../text/Typography";
import Project from "../../../entities/project";
import { UserDataType } from "../../../gx/signals/current-user";
import { useSignal } from "@dilane3/gx";

type HeaderProjectProps = {
  project: Project;
};

export default function HeaderProject({ project }: HeaderProjectProps) {
  const router = useRouter();

  // Global state
  const { user } = useSignal<UserDataType>("currentUser");

  // Some handlers
  const handleNavigateToMembers = () => {
    router.push(`/project/members/${project.id}`);
  };

  const handleNavigateToProfile = () => {
    router.push("/profile");
  };

  const handleGoBack = () => {
    router.back();
  };

  const members = project.getMembers();

  return (
    <View style={styles.header}>
      <TouchableSurface
        rounded
        style={{
          borderRadius: 50,
          width: 30,
          height: 30,
        }}
        onPress={handleGoBack}
        useForeground
        centered
      >
        <Ionicons
          name="chevron-back-outline"
          size={24}
          color={Colors.light.gray}
        />
      </TouchableSurface>

      {project.type === "shared" ? (
        <TouchableSurface useForeground onPress={handleNavigateToMembers}>
          <MultiAvatars sources={members} />
        </TouchableSurface>
      ) : (
        user && (
          <TouchableSurface onPress={handleNavigateToProfile}>
            <Avatar size={30} bgColor={user.color || "blue"} letter={user.name[0]} />
          </TouchableSurface>
        )
      )}
    </View>
  );
}

import { View } from "react-native";
import Colors from "../../constants/Colors";
import Avatar from "../avatars/Avatar";
import MultiAvatars from "../avatars/MultiAvartar";
import TouchableSurface from "../buttons/TouchableSurface";
import ProgressBar from "../progress/ProgressBar";
import Typography from "../text/Typography";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"

type ProjectCardProps = {
  type: "personal" | "shared";
};

export default function ProjectCard({ type }: ProjectCardProps) {
  // Navigation
  const router = useRouter();

  // Handlers
  const handleNavigateToProject = () => {
    router.push("/project/shared")
  };

  return (
    <TouchableSurface
      style={{ marginBottom: 20 }}
      onPress={handleNavigateToProject}
    >
      <View style={styles.container}>
        <View style={styles.cardHeader}>
          <View
            style={{
              position: "absolute",
              bottom: -25,
              left: 20,
            }}
          >
            <Avatar
              size={50}
              rounded={false}
              borderWidth={2}
              borderColor={Colors.light.background}
            />
          </View>

          {type === "shared" && (
            <View
              style={{
                width: 30,
                height: 30,
                position: "absolute",
                bottom: 10,
                right: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="link-outline"
                size={20}
                color={Colors.light.secondary}
              />
            </View>
          )}
        </View>

        <View style={styles.cardBody}>
          {type === "shared" && (
            <View
              style={{
                position: "absolute",
                top: 10,
                right: 20,
              }}
            >
              <MultiAvatars
                size={30}
                borderWidth={2}
                borderColor={Colors.light.background}
              />
            </View>
          )}

          <View style={styles.cardBodyText}>
            <Typography
              text="Project Name"
              weight="bold"
              fontSize={20}
              color={Colors.light.black}
            />
            <Typography text="Since yesterday" weight="light" fontSize={14} />
          </View>

          <ProgressBar />
        </View>
      </View>
    </TouchableSurface>
  );
}

ProjectCard.defaultProps = {
  type: "personal",
};

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
import Project from "../../entities/project";
import { formatDate } from "../../utils";

type ProjectCardProps = {
  project: Project
};

export default function ProjectCard({ project }: ProjectCardProps) {
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

          {project.type === "shared" && (
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
          {project.type === "shared" && (
            <View
              style={{
                position: "absolute",
                top: 0,
                right: 20,
              }}
            >
              <MultiAvatars
                size={26}
                borderWidth={2}
                borderColor={Colors.light.background}
                sources={project.getAvatarsMembers()}
              />
            </View>
          )}

          <View style={styles.cardBodyText}>
            <Typography
              text={project.name}
              weight="bold"
              fontSize={20}
              color={Colors.light.black}
            />
            <Typography text={formatDate(project.createdAt)} weight="light" fontSize={14} />
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

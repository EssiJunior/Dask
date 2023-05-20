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
import { useActions } from "@dilane3/gx";
import { useEffect, useState } from "react";

type ProjectCardProps = {
  project: Project
};

export default function ProjectCard({ project }: ProjectCardProps) {
  // Navigation
  const router = useRouter();

  const [projectDate, setProjectDate] = useState(formatDate(project.createdAt));

  useEffect(() => {
    let timer = setInterval(() => {
      setProjectDate(formatDate(project.createdAt));
    }, 60000);

    return () => {
      clearInterval(timer);
    }
  }, []);

  // Handlers
  const handleNavigateToProject = () => {
    router.push(`/project/${project.id}`);
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
              bgColor={project.color}
              letter={project.name[0]}
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
                sources={project.getMembers()}
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
            <Typography text={projectDate} weight="light" fontSize={14} style={{ marginTop: 5 }} />
          </View>

          <ProgressBar project={project} />
        </View>
      </View>
    </TouchableSurface>
  );
}

ProjectCard.defaultProps = {
  type: "personal",
};

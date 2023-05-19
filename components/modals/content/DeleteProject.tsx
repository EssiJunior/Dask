import { useSignal, useActions } from "@dilane3/gx";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { deleteProject } from "../../../api/projects";
import Colors from "../../../constants/Colors";
import Project from "../../../entities/project";
import { ModalStateType, NetworkDataType, UserDataType } from "../../../gx/signals";
import ProjectsRepository from "../../../storage/db/projects";
import Button from "../../buttons/Button";
import Typography from "../../text/Typography";

export default function DeleteProject() {
  // Router
  const router = useRouter();

  // Global state
  const {
    data: { project },
  } = useSignal<ModalStateType>("modal") as { data: { project: Project } };
  const { user } = useSignal<UserDataType>("currentUser");
  const { isInternetReachable } = useSignal<NetworkDataType>("network");

  const { close } = useActions("modal");
  const { show: toast } = useActions("toast");
  const { removeProject } = useActions("projects");

  // Local state
  const [loading, setLoading] = useState(false);

  // Handlers

  /**
   * Handle the delete action
   */
  const handleDelete = async () => {
    setLoading(true);


    if (project.type === "personal") {
      // Delete project
      const isDeleted = await ProjectsRepository.delete(project.id);

      setLoading(false);

      if (isDeleted) {
        // Delete project from global state
        removeProject(project.id);

        // Navigate to home
        router.replace("/");

        // Show toast
        toast({
          type: "success",
          message: "Project deleted successfully",
        });

        // Close modal
        close();
      }
    } else {
      if (!isInternetReachable) {
        setLoading(false);

        toast({
          message: "Your are not connected",
          type: "info"
        })

        return;
      }
      
      // Verify if the user is the owner of the project
      const owner = project.owner;

      if (user && owner) {
        if (owner.uid === user.uid) {
          // Delete shared project
          const { data, error } = await deleteProject(project);

          setLoading(false);

          if (data) {
            // Delete project from global state
            removeProject(project.id);

            // Navigate to home
            router.replace("/shared");

            // Show toast
            toast({
              type: "success",
              message: "Project deleted successfully",
            });

            // Close modal
            close();
          } else {
            toast({
              type: "error",
              message: "An error occurred while deleting the project",
            });
          }
        } else {
          toast({
            type: "error",
            message: "You are not the owner of this project",
          });
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Typography
        text="Delete Project"
        fontSize={24}
        weight="bold"
        color={Colors.light.secondary}
      />
      <Typography
        text="Are you sure you want to delete this project?"
        fontSize={16}
        color={Colors.light.black}
        style={{ marginTop: 16 }}
      />

      <View style={{ flexDirection: "row", marginTop: 32 }}>
        <Button
          width={100}
          type="text"
          style={{ marginRight: 20 }}
          onPress={close}
        >
          <Typography
            text="Cancel"
            fontSize={16}
            weight="semibold"
            color={Colors.light.black}
          />
        </Button>

        <Button
          width={120}
          color={Colors.light.error}
          disabled={loading}
          onPress={handleDelete}
        >
          {loading ? (
            <ActivityIndicator size={20} color={Colors.light.background} />
          ) : (
            <Typography
              text="Delete"
              fontSize={16}
              weight="semibold"
              color={Colors.dark.text}
            />
          )}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
});

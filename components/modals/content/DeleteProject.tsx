import { useSignal, useActions } from "@dilane3/gx";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Colors from "../../../constants/Colors";
import { ModalStateType } from "../../../gx/signals";
import ProjectsRepository from "../../../storage/db/projects";
import Button from "../../buttons/Button";
import Typography from "../../text/Typography";

export default function DeleteProject() {
  // Router
  const router = useRouter();

  // Global state
  const {
    data: { projectType, projectId },
  } = useSignal<ModalStateType>("modal");
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

    console.log({ projectType, projectId })

    if (projectType === "personal") {
      // Delete project
      const isDeleted = await ProjectsRepository.delete(projectId);

      setLoading(false);

      if (isDeleted) {
        // Delete project from global state
        removeProject(projectId);
        
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
      // Delete task from a shared project
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
        <Button width={100} type="text" style={{ marginRight: 20 }} onPress={close}>
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

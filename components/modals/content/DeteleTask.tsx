import { useActions, useSignal } from "@dilane3/gx";
import { useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Colors from "../../../constants/Colors";
import { ModalStateType } from "../../../gx/signals";
import TasksRepository from "../../../storage/db/tasks";
import Button from "../../buttons/Button";
import Typography from "../../text/Typography";
import { ProjectsDataType } from "../../../gx/signals/projects";

export default function DeleteTask() {
  // Global state
  const {
    data: { projectType, projectId, taskId },
  } = useSignal<ModalStateType>("modal");
  const { close } = useActions("modal");
  const { show: toast } = useActions("toast");
  const { removeTask } = useActions("projects");

  // Local state
  const [loading, setLoading] = useState(false);

  // Handlers

  /**
   * Handle the delete action
   */
  const handleDelete = async () => {
    setLoading(true);

    if (projectType === "personal") {
      // Delete task
      const isDeleted = await TasksRepository.delete(taskId);

      setLoading(false);

      if (isDeleted) {
        toast({
          type: "success",
          message: "Task deleted successfully",
        });

        // Delete task from global state
        removeTask({ taskId, projectId });

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
        text="Delete Task"
        fontSize={24}
        weight="bold"
        color={Colors.light.secondary}
      />
      <Typography
        text="Are you sure you want to delete this task?"
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
          onPress={handleDelete}
          disabled={loading}
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

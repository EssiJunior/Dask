import { useActions, useSignal } from "@dilane3/gx";
import { useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Colors from "../../../constants/Colors";
import { ModalStateType } from "../../../gx/signals";
import TasksRepository from "../../../storage/db/tasks";
import Button from "../../buttons/Button";
import Typography from "../../text/Typography";
import { RadioButton } from "react-native-paper";
import { TaskStatus } from "../../../entities/task/index";
import { updateTaskStatus } from "../../../api/tasks";

export default function ChangeTaskStatus() {
  // Global state
  const {
    data: { projectType, projectId, taskId, currentStatus },
  } = useSignal<ModalStateType>("modal");
  const { close } = useActions("modal");
  const { show: toast } = useActions("toast");
  const { changeTaskStatus } = useActions("projects");

  // Local state
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<TaskStatus>(currentStatus);

  // Handlers

  /**
   * Handle the change status of the task
   */
  const handleChangeStatus = async () => {
    if (status === currentStatus) {
      close();
      return;
    }

    setLoading(true);

    try {
      if (projectType === "personal") {
        await TasksRepository.updateStatus(taskId, status);

        changeTaskStatus({ projectId, taskId, status });

        close();

        toast({
          type: "success",
          message: "The status has been changed",
        });
      } else {
        // Update the status for shared project
        const { error } = await updateTaskStatus(taskId, status);

        setLoading(false);

        if (error) {
          console.log(error);

          toast({
            type: "error",
            message: "Status could not be changed",
          });
        } else {
          changeTaskStatus({ projectId, taskId, status });

          close();

          toast({
            type: "success",
            message: "The status has been changed",
          });
        }
      }
    } catch (error) {
      console.log(error);

      toast({
        type: "error",
        message: "An error occurred while changing the status of the task",
      });
    }
  };

  const handleSelectNewStatus = (status: TaskStatus) => {
    setStatus(status);
  };

  return (
    <View style={styles.container}>
      <Typography
        text="Change Status"
        fontSize={24}
        weight="bold"
        color={Colors.light.secondary}
      />
      <Typography
        text="Select the new status of the task"
        fontSize={16}
        color={Colors.light.black}
        style={{ marginTop: 16 }}
      />

      <View
        style={{
          width: "100%",
          marginTop: 30,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <RadioButton
            color={Colors.light.primary}
            value={TaskStatus.TODO}
            status={status === TaskStatus.TODO ? "checked" : "unchecked"}
            onPress={() => handleSelectNewStatus(TaskStatus.TODO)}
          />

          <Typography
            text="To do"
            fontSize={16}
            weight="normal"
            color={Colors.light.black}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <RadioButton
            color={Colors.light.primary}
            value={TaskStatus.PENDING}
            status={status === TaskStatus.PENDING ? "checked" : "unchecked"}
            onPress={() => handleSelectNewStatus(TaskStatus.PENDING)}
          />

          <Typography
            text="Pending"
            fontSize={16}
            weight="normal"
            color={Colors.light.black}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <RadioButton
            color={Colors.light.primary}
            value={TaskStatus.DONE}
            status={status === TaskStatus.DONE ? "checked" : "unchecked"}
            onPress={() => handleSelectNewStatus(TaskStatus.DONE)}
          />

          <Typography
            text="Done"
            fontSize={16}
            weight="normal"
            color={Colors.light.black}
          />
        </View>
      </View>

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
          color={Colors.light.primary}
          disabled={loading}
          onPress={handleChangeStatus}
        >
          {loading ? (
            <ActivityIndicator size={20} color={Colors.light.background} />
          ) : (
            <Typography
              text="Change"
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

import { useActions, useSignal } from "@dilane3/gx";
import { useContext, useMemo, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Dimensions } from "react-native";
import Colors from "../../../constants/Colors";
import { ModalStateType, NetworkDataType } from "../../../gx/signals";
import Button from "../../buttons/Button";
import Typography from "../../text/Typography";
import { ProjectsDataType } from "../../../gx/signals/projects";
import { assignTaskToMembers } from "../../../api/tasks";
import { WebsocketContext } from "../../../contexts/Websocket";
import { WebSocketEvent } from "../../../contexts/enum";
import MemberItem from "../../projects/MemberItem";
import User from "../../../entities/user";
import { ScrollView } from "react-native-gesture-handler";

export default function AssignTaskToMember() {
  // Context
  const { dispatch } = useContext(WebsocketContext);

  // Global state
  const {
    data: { projectType, projectId, taskId },
  } = useSignal<ModalStateType>("modal");
  const { isInternetReachable } = useSignal<NetworkDataType>("network");
  const { projects } = useSignal<ProjectsDataType>("projects");

  const { close } = useActions("modal");
  const { show: toast } = useActions("toast");
  const { assignTaskToMembers: assignTask } = useActions("projects");

  // Local state
  const [workers, setWorkers] = useState<User[]>([]);

  const members = useMemo(() => {
    const project = projects.find((p) => p.id === projectId);

    if (project) return project.getMembers();

    return [];
  }, [projects]);

  // Local state
  const [loading, setLoading] = useState(false);

  // Handlers

  /**
   * Select and unselect a member
   * @param member
   */
  const handleSelectMember = (member: User) => {
    const worker = workers.find((w) => w.uid === member.uid);

    if (worker) {
      const prevWorkers = workers.filter((worker) => worker.uid !== member.uid);

      setWorkers(prevWorkers);
    } else {
      setWorkers((prev) => [...workers, member]);
    }
  };

  const memberIsSelected = (member: User) => {
    const isSelected = workers.some((w) => w.uid === member.uid);

    return isSelected ? Colors.light.grayLight2 : "transparent";
  };

  const handleAssignTaskToMembers = async () => {
    setLoading(true);

    const membersId = workers.map((m) => m.uid);

    const { data } = await assignTaskToMembers(taskId, membersId);

    setLoading(false);

    if (data) {
      // Update task by adding workers
      assignTask({ projectId, taskId, members: workers });

      // Show success toast
      toast({
        message: "Members have been assigned",
        type: "success",
      });

      // Empty workers
      setWorkers([]);

      // Close modal
      close();
    } else {
      toast({
        message: "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20, alignItems: "center" }}>
        <Typography
          text="Assign to members"
          fontSize={24}
          weight="bold"
          color={Colors.light.secondary}
        />

        <View
          style={{
            marginTop: 20,
          }}
        >
          {members.map((member) => (
            <View
              style={{
                backgroundColor: memberIsSelected(member),
              }}
            >
              <MemberItem
                key={member.uid}
                member={member}
                type="search"
                onPress={() => handleSelectMember(member)}
              />
            </View>
          ))}
        </View>

        <View style={{ flexDirection: "row", marginTop: 32, marginBottom: 10 }}>
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
            onPress={handleAssignTaskToMembers}
          >
            {loading ? (
              <ActivityIndicator size={20} color={Colors.light.background} />
            ) : (
              <Typography
                text="Assign"
                fontSize={16}
                weight="semibold"
                color={Colors.dark.text}
              />
            )}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    height: Dimensions.get("window").height - 200,
  },
});

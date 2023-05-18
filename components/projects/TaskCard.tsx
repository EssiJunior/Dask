import TouchableSurface from "../buttons/TouchableSurface";
import { View } from "react-native";
import styles from "./styles/task";
import Typography from "../text/Typography";
import Badge from "../badges/Badge";
import MultiAvatars from "../avatars/MultiAvartar";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import Task from "../../entities/task";
import { capitalize } from "../../utils";
import { useMemo } from "react";
import { useActions } from "@dilane3/gx";
import { ModalTypes } from "../modals/type";
import Animated, {
  interpolate,
  runOnJS,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useAnimatedStyle } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type TaskCardProps = {
  task: Task;
  type: string;
};

export default function TaskCard({ task, type }: TaskCardProps) {
  // Router
  const router = useRouter();

  // Global state
  const { open } = useActions("modal");

  // Animations
  const END_POSITION = 100;
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);

  // Memo
  const { badgeText, badgeColor, badgeTextColor, badgeWidth } = useMemo(
    () => task.getFormatedStatus(),
    [task.status]
  );

  // Animated styles
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          position.value,
          [0, -END_POSITION],
          [0, -END_POSITION],
          "clamp"
        ),
      },
    ],
  }));

  // Animated Gestures
  const panGesture = Gesture.Simultaneous(
    Gesture.Pan()
      .onUpdate((e) => {
        if (onLeft.value) {
          position.value = e.translationX;
        } else {
          position.value = END_POSITION + e.translationX;
        }
      })
      .onEnd((e) => {
        console.log(position.value);
        if (position.value < -END_POSITION) {
          position.value = withTiming(END_POSITION, { duration: 100 });
          onLeft.value = false;

          runOnJS(open)({
            name: ModalTypes.ChangeTaskStatus,
            data: {
              taskId: task.id,
              projectType: type,
              projectId: task.projectId,
              currentStatus: task.status,
            },
          });
        } else {
          position.value = withTiming(0, { duration: 100 });
          onLeft.value = true;
        }
      })
  );

  // Handlers

  const handleNavigateToTask = () => {
    router.push(`/tasks/${task.id}`);
  };

  const handleOpenDeleteTaskModal = () => {
    open({
      name: ModalTypes.DeleteTask,
      data: {
        taskId: task.id,
        projectType: type,
        projectId: task.projectId,
      },
    });
  };

  const handleOpenChangeTaskStatusModal = () => {
    "worklet";

    open({
      name: ModalTypes.ChangeTaskStatus,
      data: {
        taskId: task.id,
        projectType: type,
        projectId: task.projectId,
        currentStatus: task.status,
      },
    });
  };

  return (
    <TouchableSurface
      style={{
        marginBottom: 20,
      }}
      onPress={handleNavigateToTask}
    >
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedStyles}>
          <View style={styles.container}>
            <View style={styles.top}>
              <View style={{ flex: 1 }}>
                <Typography text={task.title} />
              </View>

              <TouchableSurface onPress={handleOpenChangeTaskStatusModal}>
                <Badge
                  width={badgeWidth}
                  text={capitalize(badgeText)}
                  textColor={badgeTextColor}
                  color={badgeColor}
                />
              </TouchableSurface>
            </View>

            <View style={styles.bottom}>
              {type === "shared" && <MultiAvatars size={25} />}

              <View style={{ flexDirection: "row", marginLeft: "auto" }}>
                <TouchableSurface
                  rounded
                  style={{
                    borderRadius: 50,
                    width: 30,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 20,
                  }}
                >
                  <SimpleLineIcons
                    name="pencil"
                    size={20}
                    color={Colors.light.gray}
                  />
                </TouchableSurface>

                <TouchableSurface
                  rounded
                  style={{
                    borderRadius: 50,
                    width: 30,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={handleOpenDeleteTaskModal}
                >
                  <Feather name="trash-2" size={20} color={Colors.light.red} />
                </TouchableSurface>
              </View>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </TouchableSurface>
  );
}

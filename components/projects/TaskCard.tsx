import TouchableSurface from "../buttons/TouchableSurface";
import { View } from "react-native";
import styles from "./styles/task";
import Typography from "../text/Typography";
import Badge from "../badges/Badge";
import MultiAvatars from "../avatars/MultiAvartar";
import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import Task from "../../entities/task";
import { capitalize } from "../../utils";
import { useMemo } from 'react';

type TaskCardProps = {
  task: Task,
  type: string
};

export default function TaskCard({ task, type }: TaskCardProps) {
  const router = useRouter();

  const handleNavigateToTask = () => {
    router.push(`/tasks/${task.id}`);
  };

  const {
    badgeText,
    badgeColor,
    badgeTextColor,
    badgeWidth,
  } = useMemo(() => {
    let badgeWidth = 0;
    let badgeText = "";
    let badgeColor = Colors.light.grayNormal;
    let badgeTextColor = Colors.light.black;

    switch (task.status.toLowerCase()) {
      case "done":
        badgeText = "Done";
        badgeColor = Colors.light.green;
        badgeTextColor = Colors.dark.text;
        badgeWidth = 40;
        break;
      case "to do":
        badgeText = "To do";
        badgeColor = Colors.light.grayNormal;
        badgeWidth = 40;
        break;
      case "pending":
        badgeText = "Pending";
        badgeColor = Colors.light.secondary;
        badgeTextColor = Colors.dark.text;
        badgeWidth = 60
        break;
    }

    return {
      badgeText,
      badgeColor,
      badgeTextColor,
      badgeWidth,
    };
  }, [task])

  return (
    <TouchableSurface
      style={{
        marginBottom: 20,
      }}
      onPress={handleNavigateToTask}
    >
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={{ flex: 1 }}>
            <Typography text={task.title} />
          </View>

          <Badge
            width={badgeWidth}
            text={capitalize(badgeText)}
            textColor={badgeTextColor}
            color={badgeColor}
          />
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
            >
              <Feather name="trash-2" size={20} color={Colors.light.red} />
            </TouchableSurface>
          </View>
        </View>
      </View>
    </TouchableSurface>
  );
}

import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Project from "../../entities/project";
import { TaskStatus } from "../../entities/task";
import Typography from "../text/Typography";
import { styles } from "./styles";
import { useEffect } from "react";
import Colors from "../../constants/Colors";

type ProgressBarProps = {
  project: Project;
};

export default function ProgressBar({ project }: ProgressBarProps) {
  const getStats = () => {
    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter(
      (task) => task.status === TaskStatus.DONE
    ).length;

    return `${completedTasks}/${totalTasks}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressText}>
        <Typography
          text={getStats()}
          fontSize={14}
          weight="light"
          style={{ marginLeft: "auto" }}
        />
      </View>

      <View style={styles.progressBody}>
        <ProgressValue value={30} color={Colors.light.green} />
        <ProgressValue value={50} color={Colors.light.primary} />
      </View>
    </View>
  );
}

const ProgressValue = ({ value, color }: { value: number; color: string }) => {
  // Animated value
  const width = useSharedValue(value);

  useEffect(() => {
    width.value = withTiming(value, { duration: 300 });
  }, [value]);

  // Animated style
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
    backgroundColor: color,
  }));

  return <Animated.View style={[animatedStyle, styles.progress]} />;
};

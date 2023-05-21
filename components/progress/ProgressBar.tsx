import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Project from "../../entities/project";
import { TaskStatus } from "../../entities/task";
import Typography from "../text/Typography";
import { styles } from "./styles";
import { useCallback, useEffect } from "react";
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

    return `${completedTasks}/${totalTasks} completed`;
  };

  const getProgress = useCallback(() => {
    const progress = [];

    // Get stats
    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter(
      (task) => task.status === TaskStatus.DONE
    ).length;
    const pendingTasks = project.tasks.filter(
      (task) => task.status === TaskStatus.PENDING
    ).length;

    // Calculate percentages
    const completedPercentage = (completedTasks / totalTasks) * 100;
    const pendingPercentage = (pendingTasks / totalTasks) * 100;

    let rounded = false;

    if (pendingPercentage === 0) {
      rounded = true;
    }

    // Push to progress array
    progress.push({
      value: completedPercentage,
      color: Colors.light.green,
      rounded,
      type: TaskStatus.DONE,
    });

    progress.push({
      value: pendingPercentage,
      color: Colors.light.primary,
      rounded,
      type: TaskStatus.PENDING,
    });

    return progress;
  }, [project.tasks]);

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
        {getProgress().map((item, index) => (
          <ProgressValue key={index} progress={item} />
        ))}
      </View>
    </View>
  );
}

const ProgressValue = ({
  progress: { value, color, rounded, type },
}: {
  progress: {
    value: number;
    color: string;
    rounded: boolean;
    type: TaskStatus;
  };
}) => {
  // Animated value
  const width = useSharedValue(value);

  useEffect(() => {
    handleUpdateWidth(value);
  }, [value]);

  // Animated style
  const animatedStyle = useAnimatedStyle(
    () => ({
      width: `${width.value}%`,
      backgroundColor: color,
    }),
    [value]
  );

  const handleUpdateWidth = (value: number) => {
    "worklet";

    width.value = withSpring(value, { damping: 10 });
  };

  const getBorderRadius = () => {
    if (rounded) {
      if (type === TaskStatus.DONE) {
        return { borderTopRightRadius: 10, borderBottomRightRadius: 10 };
      }
    } else {
      if (type === TaskStatus.DONE) {
        return { borderTopRightRadius: 0, borderBottomRightRadius: 0 };
      }

      if (type === TaskStatus.PENDING) {
        return { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 };
      }
    }
  };

  return (
    <Animated.View
      style={[animatedStyle, styles.progress, getBorderRadius()]}
    />
  );
};

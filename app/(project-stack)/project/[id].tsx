import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderText from "../../../components/layouts/headers/HeaderText";
import Colors from "../../../constants/Colors";
import { useSearchParams } from "expo-router";
import HeaderProject from "../../../components/layouts/headers/HeaderProject";
import { ScrollView } from "react-native-gesture-handler";
import Avatar from "../../../components/avatars/Avatar";
import Typography from "../../../components/text/Typography";
import Button from "../../../components/buttons/Button";
import { Feather } from "@expo/vector-icons";
import TaskCard from "../../../components/projects/TaskCard";
import ProgressBar from "../../../components/progress/ProgressBar";
import { useEffect, useMemo, useState } from "react";
import { useSignal } from "@dilane3/gx";
import { ProjectsDataType } from "../../../gx/signals";
import { formatDate } from "../../../utils";
import { useRouter } from "expo-router";

export default function Project() {
  const searchParams = useSearchParams();
  const projectId = searchParams.id as string;
  const router = useRouter();

  // Global state
  const { projects } = useSignal<ProjectsDataType>("projects");

  const project = useMemo(() => {
    return projects.find((project) => project.id === projectId);
  }, [projectId]);

  const [projectDate, setProjectDate] = useState(
    formatDate(project ? project.createdAt : new Date())
  );

  useEffect(() => {
    let timer = setInterval(() => {
      if (project) {
        console.log("Updating date", project.createdAt);

        setProjectDate(formatDate(project.createdAt));
      }
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleCreateTask = () => {
    router.push(`/tasks/create/${projectId}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      {project && (
        <>
          <HeaderProject project={project} />

          <ScrollView style={{ flex: 1 }}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                marginTop: 20,
              }}
            >
              <Avatar
                rounded={false}
                size={80}
                bgColor={project.color}
                letter={project.name[0]}
              />

              <View style={{ flex: 1, marginLeft: 20 }}>
                <Typography
                  text={project.name}
                  fontSize={22}
                  weight="bold"
                  color={Colors.light.secondary}
                  lineHeight={25}
                />
                <Typography
                  text={projectDate}
                  weight="light"
                  color={Colors.light.gray}
                />
              </View>
            </View>

            {project.description && (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  marginTop: 20,
                }}
              >
                <Typography
                  text={project.description}
                  weight="normal"
                  color={Colors.light.gray}
                />
              </View>
            )}

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                marginTop: 20,
              }}
            >
              <View style={{}}>
                <Typography
                  text="Tasks"
                  fontSize={30}
                  weight="bold"
                  color={Colors.light.secondary}
                />
                <Typography
                  text={`You have ${project.tasks.length} tasks`}
                  weight="light"
                  color={Colors.light.gray}
                />
              </View>

              <Button rounded pv={8} onPress={handleCreateTask}>
                <Feather
                  name="plus"
                  size={20}
                  color={Colors.dark.text}
                  style={{ marginRight: 10 }}
                />

                <Typography
                  text="Add"
                  fontSize={16}
                  weight="bold"
                  color={Colors.dark.text}
                />
              </Button>
            </View>

            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
              {project.tasks.map((task) => (
                <TaskCard key={task.id} type={project.type} task={task} />
              ))}
            </View>
          </ScrollView>

          <View
            style={{
              width: "100%",
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: Colors.light.background,
              borderTopWidth: 1,
              borderTopColor: Colors.light.grayLight,
              alignItems: "center",
            }}
          >
            <ProgressBar />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

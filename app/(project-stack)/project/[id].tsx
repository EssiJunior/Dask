import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../../constants/Colors";
import { useSearchParams } from "expo-router";
import HeaderProject from "../../../components/layouts/headers/HeaderProject";
import { ScrollView } from "react-native-gesture-handler";
import Avatar from "../../../components/avatars/Avatar";
import Typography from "../../../components/text/Typography";
import Button from "../../../components/buttons/Button";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import TaskCard from "../../../components/projects/TaskCard";
import ProgressBar from "../../../components/progress/ProgressBar";
import { useEffect, useMemo, useState } from "react";
import { useActions, useSignal } from "@dilane3/gx";
import { ProjectsDataType } from "../../../gx/signals";
import { formatDate } from "../../../utils";
import { useRouter } from "expo-router";
import TouchableSurface from "../../../components/buttons/TouchableSurface";
import { ModalTypes } from "../../../components/modals/type";
import { UserDataType } from "../../../gx/signals/current-user";
import ProjectEntity from "../../../entities/project";
import Task from "../../../entities/task";
import Animated, { Layout } from "react-native-reanimated";

export default function Project() {
  const searchParams = useSearchParams();
  const projectId = searchParams.id as string;
  const router = useRouter();

  // Global state
  const { projects } = useSignal<ProjectsDataType>("projects");
  const { user } = useSignal<UserDataType>("currentUser");

  const { open } = useActions("modal");

  const project = useMemo(() => {
    return projects.find((project) => project.id === projectId);
  }, [projectId]);

  const tasks = useMemo(() => {
    if (project) {
      const tasks = project.tasks;

      if (tasks.length > 1) {
        return tasks.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }

      return tasks;
    }

    return [];
  }, [project?.tasks]);

  const owner = useMemo(() => {
    if (project) return project.owner;

    return null;
  }, [project]);

  const [projectDate, setProjectDate] = useState(
    formatDate(project ? project.createdAt : new Date())
  );

  useEffect(() => {
    let timer = setInterval(() => {
      if (project) {
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

  const handleOpenDeleteProjectModal = () => {
    if (project) {
      open({
        name: ModalTypes.DeleteProject,
        data: {
          project,
        },
      });
    }
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

                <View style={{ flexDirection: "row" }}>
                  <Typography
                    text={projectDate}
                    weight="light"
                    color={Colors.light.gray}
                    fontSize={14}
                  />

                  {(!owner || (user && user.uid === owner.uid)) && (
                    <View style={{ flexDirection: "row", marginLeft: "auto" }}>
                      {/* <TouchableSurface
                        rounded
                        style={{
                          borderRadius: 50,
                          width: 30,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 10,
                        }}
                      >
                        <SimpleLineIcons
                          name="pencil"
                          size={20}
                          color={Colors.light.gray}
                        />
                      </TouchableSurface> */}

                      <TouchableSurface
                        rounded
                        style={{
                          borderRadius: 50,
                          width: 30,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onPress={handleOpenDeleteProjectModal}
                      >
                        <Feather
                          name="trash-2"
                          size={20}
                          color={Colors.light.red}
                        />
                      </TouchableSurface>
                    </View>
                  )}
                </View>
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

            <Animated.View
              layout={Layout.delay(100)}
              style={{ marginTop: 20, paddingHorizontal: 20 }}
            >
              {tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  type={project.type}
                  task={task}
                  delay={index * 100}
                />
              ))}
            </Animated.View>
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
            <ProgressBar project={project} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

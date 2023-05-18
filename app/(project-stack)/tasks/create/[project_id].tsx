import { SafeAreaView } from "react-native-safe-area-context";
import HeaderText from "../../../../components/layouts/headers/HeaderText";
import Colors from "../../../../constants/Colors";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import Typography from "../../../../components/text/Typography";
import TextInput from "../../../../components/inputs/TextInput";
import Button from "../../../../components/buttons/Button";
import { useRouter, useSearchParams } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { object, string } from "yup";
import { useEffect, useMemo, useState } from "react";
import { useActions, useSignal } from "@dilane3/gx";
import { ProjectsDataType, UserDataType } from "../../../../gx/signals";
import { generateUID } from "../../../../utils";
import TasksRepository from "../../../../storage/db/tasks/index";
import Task, { TaskStatus } from "../../../../entities/task";
import { createTask } from "../../../../api/tasks";

let schema = object({
  title: string().min(5).required(),
  description: string(),
});

export default function Tasks() {
  const router = useRouter();
  const params = useSearchParams();
  const projectId = params.project_id as string;

  // Local state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(true);

  // Global state
  const { user } = useSignal<UserDataType>("currentUser");
  const { projects } = useSignal<ProjectsDataType>("projects");

  const { show: toast } = useActions("toast");
  const { addTask } = useActions("projects");

  const project = useMemo(() => {
    return projects.find((project) => project.id === projectId);
  }, [projectId, projects]);

  useEffect(() => {
    const check = async () => {
      const { error } = await checkForm();

      if (error) {
        setFormError(true);
      } else {
        setFormError(false);
      }
    };

    check();
  }, [title, description]);

  // Handlers

  const handleCancel = () => {
    router.back();
  };

  /**
   * Handler for change text input
   * @param value
   * @param name
   **/
  const handleChange = (value: string, name: string) => {
    if (name === "title") setTitle(value);
    if (name === "description") setDescription(value);
  };

  /**
   * Handler for submit form to create a task
   */
  const handleSubmit = async () => {
    const { value, error } = await checkForm();

    if (error) {
      console.log(error);

      toast({ message: error, type: "error" });

      return;
    }

    if (value) {
      setLoading(true);

      if (project) {
        if (project.type === "personal") {
          const taskId = generateUID();
          const taskCreatedAt = Date.now();
          const taskUpdatedAt = Date.now();

          const newTask = {
            id: taskId,
            title: value.title,
            description: value.description || "",
            projectId,
            status: TaskStatus.TODO,
            createdAt: taskCreatedAt,
            updatedAt: taskUpdatedAt,
          };

          const isTaskCreated = await TasksRepository.insert(newTask);

          if (isTaskCreated) {
            const task = new Task({
              ...newTask,
              workers: [],
              createdAt: new Date(taskCreatedAt),
              updatedAt: new Date(taskUpdatedAt),
            });

            // Add task to project
            addTask({ projectId, task });

            // show toast
            toast({ message: "Task created successfully", type: "success" });

            // Redirect to project
            router.back();
          } else {
            toast({ message: "Error creating task", type: "error" });
          }
        } else {
          // Create task in a shared project
          const { data: task } = await createTask({
            title: value.title,
            description: value.description || "",
            projectId,
          });

          if (task) {
            // Add task to project
            addTask({ projectId, task });

            // show toast
            toast({ message: "Task created successfully", type: "success" });

            // Redirect to project
            router.back();
          }
        }
      } else {
        toast({ message: "Project not found", type: "error" });
      }

      setLoading(false);
    }
  };

  /**
   * Handler for check form
   **/
  const checkForm = async () => {
    try {
      const value = await schema.validate({ title, description });

      return { value };
    } catch (err: any) {
      return { error: err.message };
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <HeaderText title="Tasks" />

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.inputsBox}>
            <TextInput
              value={title}
              placeholder="Title"
              onChange={(value) => handleChange(value, "title")}
            />
            <TextInput
              value={description}
              placeholder="Task description"
              numberOfLines={7}
              onChange={(value) => handleChange(value, "description")}
            />
          </View>

          <View style={styles.buttonsContainer}>
            <Button
              width={130}
              pv={15}
              color={Colors.light.grayLight}
              onPress={handleCancel}
            >
              <Typography
                text="Cancel"
                color={Colors.light.primary}
                weight="semibold"
              />
            </Button>

            <Button
              width={Dimensions.get("screen").width - 180}
              pv={15}
              disabled={formError || loading}
              onPress={handleSubmit}
            >
              {loading ? (
                <ActivityIndicator color={Colors.dark.text} size={23} />
              ) : (
                <Typography
                  text="Create"
                  color={Colors.light.grayLight}
                  weight="semibold"
                />
              )}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },

  inputsBox: {
    gap: 20,
    marginTop: 50,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 35,
  },
});

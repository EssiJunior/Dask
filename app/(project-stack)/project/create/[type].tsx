import { SafeAreaView } from "react-native-safe-area-context";
import HeaderText from "../../../../components/layouts/headers/HeaderText";
import Colors from "../../../../constants/Colors";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Typography from "../../../../components/text/Typography";
import TextInput from "../../../../components/inputs/TextInput";
import Button from "../../../../components/buttons/Button";
import { useRouter, useSearchParams } from "expo-router";
import { object, string } from "yup";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useActions, useSignal } from "@dilane3/gx";
import { sleep } from "../../../../utils/index";
import { createProject } from "../../../../api/projects";
import { UserDataType } from '../../../../gx/signals/current-user';

let schema = object({
  title: string().min(5).required(),
  description: string(),
});

export default function CreateProject() {
  const router = useRouter();
  const params = useSearchParams();
  const type = params.type as string;

  // Local state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(true);

  // Global state
  const { show: toast } = useActions("toast");
  const { user } = useSignal<UserDataType>("currentUser");

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

  //  Handlers

  /**
   * Handler for cancel button by going back
   **/
  const handleCancel = () => {
    router.push("/");
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
   * Handler for submit button
   **/
  const handleSubmit = async () => {
    const { value, error } = await checkForm();

    if (error) {
      console.log(error);

      return;
    }

    if (value) {
      // Start loading
      setLoading(true);
  
      // Create shared project
      if (type === "shared" && user) {
        // Create project in firebase
        const { data, error: projectError } = await createProject({
          name: value.title,
          description: value.description || "",
          owner: user,
        });
        
        if (data) {
          console.log(data);
          toast({ message: "Project has been created.", type: "success" });

          // Empty inputs
          setTitle("");
          setDescription("");

          // Go to project
          router.push(`/project/${data.id}`);
        }
      }
      
      // Stop loading
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
      <HeaderText title="Create Project" />

      <ScrollView style={styles.container}>
        <View style={styles.inputsBox}>
          <TextInput
            value={title}
            onChange={(value) => handleChange(value, "title")}
            placeholder="Title"
          />
          <TextInput
            value={description}
            onChange={(value) => handleChange(value, "description")}
            placeholder="Describe your project"
            numberOfLines={7}
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
            onPress={handleSubmit}
            disabled={formError}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
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
    marginBottom: 30,
  },
});

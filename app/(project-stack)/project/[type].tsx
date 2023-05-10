import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderText from "../../../components/layouts/headers/HeaderText";
import Colors from "../../../constants/Colors";
import { useRouter, useSearchParams } from "expo-router";
import HeaderProject from "../../../components/layouts/headers/HeaderProject";
import { ScrollView } from "react-native-gesture-handler";
import Avatar from "../../../components/avatars/Avatar";
import Typography from "../../../components/text/Typography";
import Button from "../../../components/buttons/Button";
import { Feather } from "@expo/vector-icons";
import TaskCard from "../../../components/projects/TaskCard";
import ProgressBar from "../../../components/progress/ProgressBar";

export default function Project() {
  const searchParams = useSearchParams();

  const projectType = searchParams.type as string;

  const router = useRouter();

  const handleCreateTask = () => {
    router.push("/tasks");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <HeaderProject />

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
          <Avatar rounded={false} size={80} />

          <View style={{ flex: 1, marginLeft: 20 }}>
            <Typography
              text="Project Name"
              fontSize={22}
              weight="bold"
              color={Colors.light.secondary}
            />
            <Typography
              text="2 hours ago"
              weight="light"
              color={Colors.light.gray}
            />
          </View>
        </View>

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
              text="You have 5 tasks"
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
          <TaskCard type={projectType} />
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
    </SafeAreaView>
  );
}

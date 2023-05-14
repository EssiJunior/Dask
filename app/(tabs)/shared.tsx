import { Feather } from "@expo/vector-icons";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatingButton from "../../components/buttons/FloattingButton";
import HeaderHome from "../../components/layouts/headers/HeaderHome";
import ProjectCard from "../../components/projects/ProjectCard";
import Typography from "../../components/text/Typography";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import { useSignal } from "@dilane3/gx";
import { ProjectsDataType } from "../../gx/signals";

export default function SharedProjectScreen() {
  const router = useRouter();

  // Global state
  const { projects } = useSignal<ProjectsDataType>("projects");

  const handleNavigateTo = (path: string) => {
    router.push(path);
  };

  const filterProjects = () => {
    const filteredProjects = projects.filter((project) => {
      return project.type === "shared";
    });

    return filteredProjects;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <HeaderHome />

      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Typography
          fontSize={30}
          weight="bold"
          text="Shared Projects"
          color={Colors.light.secondary}
        />
        <Typography
          fontSize={16}
          weight="light"
          text="You have 5 shared projects"
          color={Colors.light.secondary}
        />

        <View style={{ marginTop: 20 }}>
          {filterProjects().map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </View>
      </ScrollView>

      <FloatingButton
        width={180}
        rounded
        style={{ marginTop: 20 }}
        pv={13}
        ph={20}
        bottom={20}
        right={20}
        onPress={() => handleNavigateTo("/project/create/shared")}
      >
        <Feather
          name="plus"
          size={24}
          color={Colors.dark.text}
          style={{ marginRight: 15 }}
        />
        <Typography
          fontSize={16}
          color={Colors.dark.text}
          weight="bold"
          text="New Project"
        />
      </FloatingButton>
    </SafeAreaView>
  );
}

import { Feather } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatingButton from "../../components/buttons/FloattingButton";
import HeaderHome from "../../components/layouts/headers/HeaderHome";
import ProjectCard from "../../components/projects/ProjectCard";
import Typography from "../../components/text/Typography";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function SharedProjectScreen() {
  const router = useRouter();

  const handleNavigateTo = (path: string) => {
    router.push(path);
  }

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
          <ProjectCard type="shared" />
          <ProjectCard type="shared" />
          <ProjectCard type="shared" />
          <ProjectCard type="shared" />
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
        onPress={() => handleNavigateTo('/project/create/shared')}
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

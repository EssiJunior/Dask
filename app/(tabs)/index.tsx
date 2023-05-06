import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/buttons/Button";
import FloatingButton from "../../components/buttons/FloattingButton";
import HeaderHome from "../../components/layouts/headers/HeaderHome";
import Typography from "../../components/text/Typography";
import Colors from "../../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import storage from "../../storage";
import { READ_TERMS } from "../../constants";
import { useActions } from "@dilane3/gx";
import ProjectCard from "../../components/projects/ProjectCard";

export default function HomeScreen() {
  // Global actions
  const { setTermsRead } = useActions("terms");

  const handleUnreadTerms = async () => {
    await storage.removeItem(READ_TERMS);

    setTermsRead(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <HeaderHome />

      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Typography
          fontSize={26}
          weight="semibold"
          text="Personal Projects"
          color={Colors.light.secondary}
        />
        <Typography
          fontSize={16}
          weight="light"
          text="You have 5 projects"
          color={Colors.light.secondary}
        />

        <View style={{ marginTop: 20 }}>
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
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
        onPress={handleUnreadTerms}
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

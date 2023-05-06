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

export default function HomeScreen() {
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

        {
          // TODO: Add projects list
        }
      </ScrollView>

      <FloatingButton
        width={180}
        rounded
        style={{ marginTop: 20 }}
        pv={13}
        ph={20}
        bottom={20}
        right={20}
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

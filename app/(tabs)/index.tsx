import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/buttons/Button";
import FloatingButton from "../../components/buttons/FloattingButton";
import Typography from "../../components/text/Typography";
import Colors from "../../constants/Colors";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Typography fontSize={18} weight="semibold" text="Personal Projects" />

      <FloatingButton
        width={180}
        rounded
        style={{ marginTop: 20 }}
        pv={15}
        ph={25}
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
          fontSize={18}
          color={Colors.dark.text}
          weight="bold"
          text="New Project"
        />
      </FloatingButton>
    </SafeAreaView>
  );
}

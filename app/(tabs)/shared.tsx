import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatingButton from "../../components/buttons/FloattingButton";
import Typography from "../../components/text/Typography";
import Colors from "../../constants/Colors";

export default function SharedProjectScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Typography fontSize={18} weight="bold" text="Shared Projects" />

      <FloatingButton
        width={200}
        rounded
        style={{ marginTop: 20 }}
        pv={15}
        ph={25}
        bottom={20}
        right={20}
      >
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

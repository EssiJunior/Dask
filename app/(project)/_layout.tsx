import { Stack } from "expo-router";
import React from "react";

export default function ProjectsLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="create" options={{ headerShown: false }} />
        <Stack.Screen name="tasks" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

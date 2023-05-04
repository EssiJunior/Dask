import "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    TitilliumRegular: require("../assets/fonts/Titillium/TitilliumWeb-Regular.ttf"),
    TitilliumBlack: require("../assets/fonts/Titillium/TitilliumWeb-Black.ttf"),
    TitilliumBold: require("../assets/fonts/Titillium/TitilliumWeb-Bold.ttf"),
    TitilliumMedium: require("../assets/fonts/Titillium/TitilliumWeb-SemiBold.ttf"),
    TitilliumLight: require("../assets/fonts/Titillium/TitilliumWeb-Light.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: Colors.light.background }}
    >
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}

      <StatusBar style="dark" />
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

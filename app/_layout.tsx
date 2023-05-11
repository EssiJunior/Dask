import "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import storage from "../storage";
import { READ_TERMS } from "../constants";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { sleep } from "../utils";
import GXProvider, { useActions, useSignal } from "@dilane3/gx";
import store from "../gx/store";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  // Load fonts before rendering the app.
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
    <GXProvider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
        {!loaded && <SplashScreen />}
        {loaded && <RootLayoutNav />}

        <StatusBar style="dark" />
      </GestureHandlerRootView>
    </GXProvider>
  );
}

function RootLayoutNav() {
  // Global state
  const { read: termsRead, loading: termsReadLoading } = useSignal("terms");

  // Global actions
  const { setTermsRead } = useActions("terms");

  // Navigation
  const navigation = useNavigation();

  useEffect(() => {
    const getTermsRead = async () => {
      const termsRead = await storage.getItem(READ_TERMS);

      setTermsRead(termsRead !== null);
    };

    getTermsRead();
  }, []);

  useEffect(() => {
    const navigateToWelcomeScreen = async () => {
      if (!termsReadLoading && !termsRead) handleGoToWelcome();
    };

    navigateToWelcomeScreen();
  }, [termsRead, termsReadLoading]);

  // Some handlers
  const handleGoToWelcome = () => {
    navigation.dispatch(CommonActions.navigate("welcome"));
  };

  return <Stack screenOptions={{ headerShown: false }} />;
}

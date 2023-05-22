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
import useAuth from "../hooks/useAuth";
import ToastContainer from "../components/toast/ToastContainer";
import useLoadProjects from "../hooks/useLoadProjects";
import ModalContainer from "../components/modals/ModalContainer";
import useNetworkStats from "../hooks/useNetworkStats";
import { NetworkDataType, ToastDataType } from "../gx/signals";
import WebsocketProvider from "../contexts/Websocket";

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
  const { isInternetReachable, isConnected, ready } = useSignal<NetworkDataType>("network");
  const { show: toast } = useActions("toast");

  // Global actions
  const { setTermsRead } = useActions("terms");

  // Local storage
  const [firstTime, setFirstTime] = useState(true);

  // Navigation
  const navigation = useNavigation();

  // Custom hooks
  useNetworkStats();
  useAuth();
  useLoadProjects();

  useEffect(() => {
    const getTermsRead = async () => {
      const termsRead = await storage.getItem(READ_TERMS);

      setTermsRead(termsRead !== null);
    };

    getTermsRead();
  }, []);

  useEffect(() => {
    if (ready) {
      if (isInternetReachable && isConnected) {
        if (!firstTime) {
          toast({ message: "You are online", type: "success" });
        } else {
          setFirstTime(false);
        }
      } else {
        toast({ message: "Check your internet connection", type: "info" });
      }
    }
  }, [isInternetReachable, isConnected, ready]);

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

  return (
    <WebsocketProvider>
      <ToastContainer>
        <>
          <Stack screenOptions={{ headerShown: false }} />

          <ModalContainer />
        </>
      </ToastContainer>
    </WebsocketProvider>
  );
}

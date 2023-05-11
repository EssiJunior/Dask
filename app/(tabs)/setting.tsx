import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderText from "../../components/layouts/headers/HeaderText";
import Colors from "../../constants/Colors";
import auth from '@react-native-firebase/auth';
import { SetStateAction, useEffect, useState } from "react";

export default function SettingScreen() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.light.background,
      }}
    >
      <HeaderText title="Settings" />

      {
        // TODO: Add settings here
      }
    </SafeAreaView>
  )
}
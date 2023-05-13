import { Tabs } from "expo-router";
import { TabBar } from "../../components/layouts/tabs";
import { useSignal } from "@dilane3/gx";

export default function TabLayout() {
  // Global state
  const { read: termsRead } = useSignal("terms");

  return (
    <>
      {termsRead && (
        <Tabs
          initialRouteName="home"
          screenOptions={{
            headerShown: false,
          }}
          tabBar={(props) => <TabBar {...props} />}
        ></Tabs>
      )}
    </>
  );
}

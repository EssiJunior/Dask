import { Tabs } from "expo-router";
import { TabBar } from "../../components/layouts/tabs";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    ></Tabs>
  );
}

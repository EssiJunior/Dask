import { useState, useEffect } from "react";
import { Tabs } from "expo-router";
import { TabBar } from "../../components/layouts/tabs";
import { READ_TERMS } from "../../constants";
import storage from "../../storage";
import { sleep } from "../../utils";
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

import { useEffect } from "react";
import { View } from "react-native";
import {
  TabNavigationState,
  ParamListBase,
  NavigationHelpers,
} from "@react-navigation/native";
import { Link, useRouter } from 'expo-router';
import React from "react";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import TouchableSurface from "../../buttons/TouchableSurface";
import Colors from "../../../constants/Colors";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { UserDataType } from "../../../gx/signals";
import { useSignal } from "@dilane3/gx";

type TabBarProps = {
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase>;
};

export function TabBar({ state, navigation }: TabBarProps) {
  const tabIndex = state.index;
  const tabName = state.routeNames[tabIndex];

  const router = useRouter();

  // Global state
  const { user } = useSignal<UserDataType>("currentUser");

  // Handlers
  const handleTabPress = (tabName: string) => {
    if (tabName === "profile" || tabName === "shared") {
      if (user) {
        navigation.navigate(tabName);
      } else {
        router.push("/signin");
      }
    } else {
      navigation.navigate(tabName);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        backgroundColor: Colors.light.background,
      }}
    >
      <Link href="index">
        <TabBarIcon
          onPress={() => handleTabPress("index")}
          active={tabName === "index"}
        >
          <MaterialCommunityIcons
            name={
              tabName === "index" ? "view-dashboard" : "view-dashboard-outline"
            }
            size={30}
            style={{ marginBottom: -3 }}
            color={
              tabName === "index"
                ? Colors.light.primary
                : Colors.light.tabIconDefault
            }
          />
        </TabBarIcon>
      </Link>

      <Link href="shared">
        <TabBarIcon
          onPress={() => handleTabPress("shared")}
          active={tabName === "shared"}
        >
          <Ionicons
            name={tabName === "shared" ? "folder-open" : "folder-open-outline"}
            size={28}
            style={{ marginBottom: -3 }}
            color={
              tabName === "shared"
                ? Colors.light.primary
                : Colors.light.tabIconDefault
            }
          />

          {/* folder-account-outline */}
        </TabBarIcon>
      </Link>

      <Link href="profile">
        <TabBarIcon
          onPress={() => handleTabPress("profile")}
          active={tabName === "profile"}
        >
          <Ionicons
            name={
              tabName === "profile" ? "person-circle" : "person-circle-outline"
            }
            size={28}
            style={{ marginBottom: -3 }}
            color={
              tabName === "profile"
                ? Colors.light.primary
                : Colors.light.tabIconDefault
            }
          />
        </TabBarIcon>
      </Link>

      <Link href="setting">
        <TabBarIcon
          onPress={() => handleTabPress("setting")}
          active={tabName === "setting"}
        >
          <Ionicons
            name={tabName === "setting" ? "settings-sharp" : "settings-outline"}
            size={28}
            style={{ marginBottom: -3 }}
            color={
              tabName === "setting"
                ? Colors.light.primary
                : Colors.light.tabIconDefault
            }
          />
        </TabBarIcon>
      </Link>
    </View>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon({
  children,
  onPress,
  active,
}: {
  children?: React.ReactNode;
  onPress?: () => void;
  active: boolean;
}) {
  // Shared value
  const activeValue = useSharedValue(active ? 1 : 0);

  // Use effect
  useEffect(() => {
    if (active) {
      activeValue.value = withTiming(1, { duration: 300 });
    } else {
      activeValue.value = withTiming(0, { duration: 500 });
    }
  }, [active]);

  // Shared value style
  const activeStyle = useAnimatedStyle(() => ({
    opacity: activeValue.value,
    transform: [
      {
        scale: interpolate(activeValue.value, [0, 1], [0.7, 1]),
      },
    ],
  }));

  const IconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(activeValue.value, [0, 1], [0.8, 1]),
      },
    ],
  }));

  return (
    <View
      style={{
        position: "relative",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Animated.View style={[IconStyle]}>
        <TouchableSurface
          onPress={onPress}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 14,
          }}
        >
          {children}
        </TouchableSurface>
      </Animated.View>

      <Animated.View
        style={[
          {
            width: 40,
            height: 5,
            backgroundColor: Colors.light.primary,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          },
          activeStyle,
        ]}
      />
    </View>
  );
}

import { useEffect } from "react";
import { View } from "react-native";
import {
  TabNavigationState,
  ParamListBase,
  NavigationHelpers,
} from "@react-navigation/native";
import { Link } from "expo-router";
import React from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Button from "../../buttons/Button";
import Colors from "../../../constants/Colors";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate
} from "react-native-reanimated";

type TabBarProps = {
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase>;
};

export function TabBar({ state, navigation }: TabBarProps) {
  const tabIndex = state.index;
  const tabName = state.routeNames[tabIndex];

  // Handlers
  const handleTabPress = (tabName: string) => {
    navigation.navigate(tabName);
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
          <MaterialIcons
            name="dashboard"
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
          <MaterialIcons
            name="folder-shared"
            size={30}
            style={{ marginBottom: -3 }}
            color={
              tabName === "shared"
                ? Colors.light.primary
                : Colors.light.tabIconDefault
            }
          />
        </TabBarIcon>
      </Link>

      <Link href="profile">
        <TabBarIcon
          onPress={() => handleTabPress("profile")}
          active={tabName === "profile"}
          
        >
          <Ionicons
            name="person-circle"
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
            name="settings-sharp"
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
        scale: interpolate(activeValue.value, [0, 1], [.7, 1])
      },
    ]
  }));

  const IconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(activeValue.value, [0, 1], [.8, 1.2])
      },
    ]
  }))

  return (
    <View
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <Animated.View
        style={[IconStyle]}
      >
        <Button onPress={onPress}>{children}</Button>
      </Animated.View>

      <Animated.View
        style={[
          {
            width: "100%",
            height: 5,
            backgroundColor: Colors.light.primary,
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
          },
          activeStyle,
        ]}
      />
    </View>
  );
}

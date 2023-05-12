import { View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Toast from "./Toast";
import { useEffect } from 'react';
import { sleep } from "../../utils";
import { useSignal, useActions } from '@dilane3/gx';
import { ToastDataType } from "../../gx/signals";

type ToastContainerProps = {
  children: React.ReactNode;
};

export default function ToastContainer({ children }: ToastContainerProps) {
  // Global state
  const { message, type, visible } = useSignal<ToastDataType>("toast");

  const { hide } = useActions("toast");

  const translateY = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      sleep(5000).then(() => {
        hide();

        translateY.value = 0;
      });
    }
  }, [visible])

  useEffect(() => {
    if (visible) {
      translateY.value = 1;
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(
          interpolate(translateY.value, [0, 1], [-100, 50], "clamp"),
          { duration: 300 }
        ),
      },
    ],
    opacity: withTiming(
      interpolate(translateY.value, [0, 1], [0, 1], "clamp"),
      { duration: 300 }
    ),
  }));

  return (
    <View style={{ flex: 1 }}>
      {children}

      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            width: "100%",
            alignItems: "center",
          },
          animatedStyle,
        ]}
      >
        <Toast message="User connected" type={type} />
      </Animated.View>
    </View>
  );
}

import { Dimensions, Modal, View } from "react-native";
import DeleteTask from "./content/DeteleTask";
import styles from "./styles";
import DeleteProject from "./content/DeleteProject";
import { useActions, useSignal } from "@dilane3/gx";
import { ModalStateType } from "../../gx/signals/modal";
import { ModalTypes } from "./type";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import ChangeTaskStatus from "./content/ChangeTaskStatus";
import AssignTaskToMember from "./content/AssignTaskToMember";
import { ScrollView } from "react-native-gesture-handler";

export default function ModalContainer() {
  // Global state
  const { name, open } = useSignal<ModalStateType>("modal");
  const { close } = useActions("modal");

  // Animation section
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (open) {
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      opacity.value = withDelay(1100, withTiming(0, { duration: 300 }));
    }
  }, [open]);

  // Animated style
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(opacity.value, [0, 1], [0, 0.8], "clamp"),
    zIndex: interpolate(opacity.value, [0, 1], [-3, 1], "clamp"),
  }));

  /**
   * Render the content of the modal
   * @returns {React.ReactNode}
   */
  const renderContent = (): React.ReactNode => {
    switch (name) {
      case ModalTypes.DeleteTask: {
        return <DeleteTask />;
      }
      case ModalTypes.DeleteProject: {
        return <DeleteProject />;
      }
      case ModalTypes.ChangeTaskStatus: {
        return <ChangeTaskStatus />
      }
      case ModalTypes.AssignTaskToMember: {
        return <AssignTaskToMember />
      }
      default:
        return null;
    }
  };

  return (
    <>
      <Modal
        animationType="fade"
        style={styles.modalView}
        visible={open}
        transparent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalContent}>{renderContent()}</View>
        </View>
      </Modal>

      <Animated.View style={[styles.bgView, animatedStyle]} />
    </>
  );
}

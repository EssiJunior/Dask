import { Ionicons } from "@expo/vector-icons";
import { Dimensions, View } from "react-native";
import Colors from "../../constants/Colors";
import Typography from "../text/Typography";

type ToastProps = {
  message: string;
  type: "success" | "error" | "info";
};

export default function Toast({ message, type }: ToastProps) {
  const getColor = () => {
    if (type === "success") return Colors.light.success;
    if (type === "error") return Colors.light.error;
    return Colors.light.info;
  }

  const getIcon = () => {
    if (type === "success") return "checkmark-circle";
    if (type === "error") return "md-close-circle-sharp";
    return "md-information-circle";
  }

  return (
    <View
      style={{
        backgroundColor: getColor(),
        padding: 15,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: Dimensions.get('screen').width - 40,
      }}
    >
      <Ionicons 
        name={getIcon()}
        size={30}
        color={Colors.light.background}
      />
      <Typography text={message} weight="bold" color={Colors.dark.text} style={{ marginLeft: 10 }} />
    </View>
  );
}

Toast.defaultProps = {
  type: "info",
}
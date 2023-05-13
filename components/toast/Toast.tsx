import { View } from "react-native";
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

  return (
    <View
      style={{
        backgroundColor: getColor(),
        padding: 15,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "80%"
      }}
    >
      <Typography text={message} weight="bold" color={Colors.dark.text} />
    </View>
  );
}

Toast.defaultProps = {
  type: "info",
}
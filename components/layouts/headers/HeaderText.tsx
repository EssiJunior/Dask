import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import TouchableSurface from "../../buttons/TouchableSurface";
import Colors from "../../../constants/Colors";
import Typography from "../../text/Typography";
import { useNavigation, CommonActions } from "@react-navigation/native";

type HeaderTextProps = {
  title: string;
};

export default function HeaderText({ title }: HeaderTextProps) {
  const navigation = useNavigation();

  // Some handlers
  const handleBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  return (
    <View style={[styles.header, { justifyContent: "center" }]}>
      <View
        style={{
          position: "absolute",
          left: 20,
        }}
      >
        <TouchableSurface
          rounded
          style={{
            borderRadius: 50,
            width: 30,
            height: 30,
          }}
          onPress={handleBack}
          centered
        >
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color={Colors.light.gray}
          />
        </TouchableSurface>
      </View>

      <Typography
        text={title}
        fontSize={24}
        weight="bold"
        color={Colors.light.secondary}
      />
    </View>
  );
}

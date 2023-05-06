import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../../components/avatars/Avatar";
import Badge from "../../components/badges/Badge";
import Button from "../../components/buttons/Button";
import HeaderText from "../../components/layouts/headers/HeaderText";
import Typography from "../../components/text/Typography";
import Colors from "../../constants/Colors";

export default function ProfileScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.light.background,
      }}
    >
      <HeaderText title="Profile" />

      {/* 
          TODO: Add profile information here
      */}



      <Badge text="done" width={40} />
      <Badge text="In process" width={70} color={Colors.light.green} />
      <Badge text="To do" width={45} color={Colors.light.tabIconDefault} />
    </SafeAreaView>
  );
}

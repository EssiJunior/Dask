import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../../components/avatars/Avatar";
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

      <Button
        width={150}
        type="outlined"
        style={{ marginTop: 20 }}
        pv={10}
        ph={20}
      >
        <Typography
          fontSize={18}
          color={Colors.light.primary}
          weight="bold"
          text="Logout"
        />
      </Button>

      <Button
        width={150}
        type="contained"
        style={{ marginTop: 20 }}
        pv={10}
        ph={20}
      >
        <Typography
          fontSize={18}
          color={Colors.dark.text}
          weight="light"
          text="Logout"
        />
      </Button>

      <Button width={150} type="text" style={{ marginTop: 20 }} pv={10} ph={20}>
        <Typography
          fontSize={16}
          color={Colors.light.text}
          weight="light"
          text="Logout"
        />
      </Button>
      <Avatar
        size={200}
        rounded={false}
        style={{
          marginTop: 20,
        }}
      />
    </SafeAreaView>
  );
}

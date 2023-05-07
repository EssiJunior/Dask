import { SafeAreaView } from "react-native-safe-area-context";
import HeaderText from "../../../components/layouts/headers/HeaderText";
import Colors from "../../../constants/Colors";

export default function CreateProject() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <HeaderText title="Create Project" />
    </SafeAreaView>
  )
}
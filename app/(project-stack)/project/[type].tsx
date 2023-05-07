import { SafeAreaView } from "react-native-safe-area-context";
import HeaderText from "../../../components/layouts/headers/HeaderText";
import Colors from "../../../constants/Colors";
import { useSearchParams } from "expo-router"
import HeaderProject from "../../../components/layouts/headers/HeaderProject";

export default function Project() {
  const searchParams = useSearchParams();

  const { type: projectType } = searchParams;

  console.log(projectType);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <HeaderProject />
    </SafeAreaView>
  );
}

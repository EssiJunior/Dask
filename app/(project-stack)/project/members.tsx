import { Dimensions, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/buttons/Button";
import TextInput from "../../../components/inputs/TextInput";
import HeaderText from "../../../components/layouts/headers/HeaderText";
import Typography from "../../../components/text/Typography";
import Colors from "../../../constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import MemberItem from "../../../components/projects/MemberItem";

export default function Members() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <HeaderText title="Members" />

      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20
          }}
        >
          <TextInput
            placeholder="Invite new persons"
            fontSize={16}
            width={Dimensions.get("window").width - 130}
            pv={5}
            style={{
              paddingLeft: 50,
            }}
            value="Hello"
          >
            <View
              style={{
                position: "absolute",
                left: 35,
                top: 10,
              }}
            >
              <Ionicons 
                name="person-add-outline"
                size={20}
                color={Colors.light.gray}
              />
            </View>
          </TextInput>

          <Button width={80}>
            <Typography text="Invite" color={Colors.dark.text} weight="bold" />
          </Button>
        </View>

        <View style={{
          marginTop: 20,
        }}>
          <MemberItem />
          <MemberItem />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

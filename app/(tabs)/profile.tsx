import { Dimensions, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../../components/avatars/Avatar";
import Badge from "../../components/badges/Badge";
import Button from "../../components/buttons/Button";
import Dot from "../../components/dot/Dot";
import HeaderText from "../../components/layouts/headers/HeaderText";
import Typography from "../../components/text/Typography";
import Colors from "../../constants/Colors";

const image = require("../../assets/images/image1.jpeg")
const image2 = require("../../assets/images/image2.jpeg")

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
      <Badge text="To do" width={45} color={Colors.light.grayNormal} textColor={Colors.light.text} />

      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          justifyContent: "space-between",
          marginTop: 30,
        }}
      >
        <Button
          width={120}
          textColor={Colors.light.secondary}
          color={Colors.light.grayLight}
        >
          <Typography
            text="Cancel"
            color={Colors.light.secondary}
            weight="bold"
            fontSize={16}
          />
        </Button>
        <Button
          width={Dimensions.get("window").width - 180}
          textColor={Colors.light.secondary}
        >
          <Typography
            text="Signin"
            color={Colors.dark.text}
            weight="bold"
            fontSize={16}
          />
        </Button>
      </View>

      <View
        style={{
          position: "relative",
          width: 40,
        }}
      >
        <Avatar source={image} />
        <Dot 
          size={10}
          color={Colors.light.green}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        />
      </View>
      <Avatar source={image2} size={100} />
      <Avatar source={image} size={140} rounded={false} style={{ marginTop: 20 }} />
    </SafeAreaView>
  );
}

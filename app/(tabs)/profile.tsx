import { Dimensions, Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../../components/avatars/Avatar";
import Badge from "../../components/badges/Badge";
import Button from "../../components/buttons/Button";
import Dot from "../../components/dot/Dot";
import TextInput from "../../components/inputs/TextInput";
import HeaderText from "../../components/layouts/headers/HeaderText";
import Typography from "../../components/text/Typography";
import Colors from "../../constants/Colors";

const image = require("../../assets/images/image1.jpeg");
const image2 = require("../../assets/images/image2.jpeg");

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderText title="Profile" />
      <ScrollView>
        <View style={styles.container}>
          <Avatar
            source={image}
            size={140}
            rounded={true}
            style={{ marginTop: 20 }}
          />
          <View style={styles.myIDContainer}>
            <Typography
              text="Ngimdock Zemfack"
              weight="bold"
              fontSize={25}
              color={Colors.light.secondary}
              style={styles.whoAmI}
            />
            <Typography
              text="ngimdock@gmail.com"
              weight="normal"
              fontSize={15}
              color={Colors.light.gray}
              style={styles.whoAmI}
            />
          </View>

          <View style={styles.projects}>
            <Typography
              fontSize={24}
              weight="semibold"
              text="Personal Projects"
              color={Colors.light.secondary}
              style={styles.projectsText}
            />
            <Typography
              fontSize={16}
              weight="light"
              text="You have 9 personal projects"
              color={Colors.light.secondary}
              style={styles.projectsText}
            />
          </View>
          <View style={styles.projects}>
            <Typography
              fontSize={24}
              weight="semibold"
              text="Shared Projects"
              color={Colors.light.secondary}
              style={styles.projectsText}
            />
            <Typography
              fontSize={16}
              weight="light"
              text="You have 5 shared projects"
              color={Colors.light.secondary}
              style={styles.projectsText}
            />
          </View>
        </View>

        {/* <Badge text="done" width={40} />
        <Badge text="In process" width={70} color={Colors.light.green} />
        <Badge
          text="To do"
          width={45}
          color={Colors.light.grayNormal}
          textColor={Colors.light.text}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: Colors.light.background,
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
  },
  myIDContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  whoAmI: {
    textAlign: "center",
    width: "100%",
  },
  projects: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.light.grayNormal,
    marginTop: 20,
    paddingTop: 20,
    width: "100%",
    paddingHorizontal: 20
  },
  projectsText: {
    textAlign: "left",
    width: "90%",
  },
});

import { useActions, useSignal } from "@dilane3/gx";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions, Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../../components/avatars/Avatar";
import Badge from "../../components/badges/Badge";
import Button from "../../components/buttons/Button";
import TouchableSurface from "../../components/buttons/TouchableSurface";
import Dot from "../../components/dot/Dot";
import TextInput from "../../components/inputs/TextInput";
import HeaderText from "../../components/layouts/headers/HeaderText";
import Typography from "../../components/text/Typography";
import { DASK_USER_ID } from "../../constants";
import Colors from "../../constants/Colors";
import { UserDataType } from "../../gx/signals";
import storage from "../../storage";
import { useRouter } from "expo-router";
import { ProjectsDataType } from "../../gx/signals/projects";

export default function ProfileScreen() {
  const router = useRouter();

  // Global state
  const { user } = useSignal<UserDataType>("currentUser");
  const { projects } = useSignal<ProjectsDataType>("projects");

  const { logout } = useActions("currentUser");
  const { show: toast } = useActions("toast");
  const { removeAllSharedProjects } = useActions("projects");

  const handleLogout = async () => {
    // Empty local storage
    await storage.removeItem(DASK_USER_ID);

    // Show toast
    toast({ message: "You have been logged out", type: "info" });

    // Remove all shared projects
    removeAllSharedProjects();

    // Logout
    logout();

    // Navigate to home
    router.replace("/");
  };

  const filterProjects = (type: string) => {
    const filteredProjects = projects.filter((project) => {
      return project.type === type;
    });

    return filteredProjects;
  };

  // Dimensions.get("screen").height

  return (
    <SafeAreaView style={styles.container}>
      <HeaderText title="Profile" />
      {user && (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <Avatar
            source={user.avatar}
            size={120}
            rounded={true}
            style={{ marginTop: 20 }}
            bgColor={user.color || "blue"}
            letter={user.name[0]}
          />
          <View style={styles.myIDContainer}>
            <Typography
              text={user.name}
              weight="bold"
              fontSize={24}
              color={Colors.light.secondary}
              style={styles.whoAmI}
            />
            <Typography
              text={user.email}
              weight="normal"
              fontSize={15}
              color={Colors.light.gray}
              style={styles.whoAmI}
            />
          </View>

          <View
            style={{
              width: "100%",
              paddingHorizontal: 20,
              paddingBottom: 10,
              marginTop: 20,
            }}
          >
            <Typography
              text="Statistics"
              weight="semibold"
              fontSize={24}
              color={Colors.light.secondary}
            />
          </View>

          <View style={styles.projects}>
            <Typography
              fontSize={18}
              weight="semibold"
              text="Personal Projects"
              color={Colors.light.black}
              style={styles.projectsText}
            />
            <Typography
              fontSize={16}
              weight="light"
              text={`You have ${
                filterProjects("personal").length
              } personal project${
                filterProjects("personal").length > 1 ? "s" : ""
              }`}
              color={Colors.light.black}
              style={styles.projectsText}
            />
          </View>
          <View style={styles.projects}>
            <Typography
              fontSize={18}
              weight="semibold"
              text="Shared Projects"
              color={Colors.light.black}
              style={styles.projectsText}
            />
            <Typography
              fontSize={16}
              weight="light"
              text={`You have ${
                filterProjects("shared").length
              } shared project${
                filterProjects("shared").length > 1 ? "s" : ""
              }`}
              color={Colors.light.black}
              style={styles.projectsText}
            />
          </View>

          <View
            style={{
              width: "100%",
              paddingHorizontal: 20,
              paddingBottom: 10,
              marginTop: 30,
            }}
          >
            <Typography
              text="Manage Account"
              weight="semibold"
              fontSize={24}
              color={Colors.light.secondary}
            />
          </View>

          {/* <View style={styles.rowBlock}>
            <Ionicons
              name="person-outline"
              size={22}
              color={Colors.light.black}
            />

            <Typography
              fontSize={18}
              weight="semibold"
              text="Update profile"
              color={Colors.light.black}
              style={[styles.projectsText, { marginLeft: 10 }]}
            />
          </View> */}

          <TouchableSurface onPress={handleLogout} style={{ marginBottom: 50 }}>
            <View style={styles.rowBlock}>
              <Ionicons
                name="log-out-outline"
                size={24}
                color={Colors.light.black}
              />

              <Typography
                fontSize={18}
                weight="semibold"
                text="Log out"
                color={Colors.light.black}
                style={[styles.projectsText, { marginLeft: 10 }]}
              />
            </View>
          </TouchableSurface>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: Colors.light.background,
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
    paddingVertical: 15,
    width: "100%",
  },
  rowBlock: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.light.grayNormal,
    paddingVertical: 15,
    width: "100%",
    paddingHorizontal: 20,
  },
  projectsText: {
    textAlign: "left",
    width: "90%",
  },
});

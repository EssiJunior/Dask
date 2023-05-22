import { Skeleton } from "@rneui/themed";
import { StyleSheet, View, Dimensions } from "react-native";
import Colors from "../../constants/Colors";

export const ProjectSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header} />

      <View style={styles.avatar}>
        <Skeleton
          animation="pulse"
          width={50}
          height={50}
          style={{
            borderRadius: 5,
            borderWidth: 3,
            borderColor: Colors.light.background,
            backgroundColor: Colors.light.grayNormal,
          }}
          skeletonStyle={{ backgroundColor: Colors.light.grayNormal }}
        />
      </View>

      <View style={styles.body}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            position: "absolute",
            top: 5,
            right: 20,
          }}
        >
          <Skeleton
            animation="pulse"
            width={25}
            height={25}
            style={{ borderRadius: 50, marginRight: 5 }}
          />
          <Skeleton
            animation="pulse"
            width={25}
            height={25}
            style={{ borderRadius: 50 }}
          />
        </View>

        <Skeleton
          animation="pulse"
          width={200}
          height={10}
          style={{ marginTop: 30 }}
        />
        <Skeleton
          animation="pulse"
          width={80}
          height={5}
          style={{ marginTop: 10 }}
        />

        <View style={styles.progress}>
          <Skeleton
            animation="pulse"
            width={50}
            height={5}
            style={{ marginLeft: "auto" }}
          />

          <Skeleton
            animation="pulse"
            width={Dimensions.get("screen").width - 80}
            height={5}
            style={{ marginTop: 10, borderRadius: 10 }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 100,
    borderWidth: 1,
    borderColor: Colors.light.grayLight,
    borderRadius: 10,
    marginBottom: 20,
  },

  header: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.light.grayNormal,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  avatar: {
    position: "absolute",
    top: 30,
    left: 20,
  },

  body: {
    padding: 20,
  },

  progress: {
    marginTop: 20,
  },
});

import TouchableSurface from "../buttons/TouchableSurface";
import { View } from "react-native";
import styles from "./styles/task";
import Typography from "../text/Typography";
import Badge from "../badges/Badge";
import MultiAvatars from "../avatars/MultiAvartar";
import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";

type TaskCardProps = {
  type: string;
};

export default function TaskCard({ type }: TaskCardProps) {
  const router = useRouter();

  const handleNavigateToTask = () => {
    router.push("/tasks/1");
  };

  return (
    <TouchableSurface
      style={{
        marginBottom: 20,
      }}
      onPress={handleNavigateToTask}
    >
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={{ flex: 1 }}>
            <Typography text="Acheter les cahiers et toutes les fournitures scolaires, sac, ardoise, craies, stylos a billet et ram de format" />
          </View>

          <Badge
            width={40}
            text="Todo"
            textColor={Colors.light.black}
            color={Colors.light.grayNormal}
          />
        </View>

        <View style={styles.bottom}>
          {type === "shared" && <MultiAvatars size={25} />}

          <View style={{ flexDirection: "row", marginLeft: "auto" }}>
            <TouchableSurface
              rounded
              style={{
                borderRadius: 50,
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 20,
              }}
            >
              <SimpleLineIcons
                name="pencil"
                size={20}
                color={Colors.light.gray}
              />
            </TouchableSurface>

            <TouchableSurface
              rounded
              style={{
                borderRadius: 50,
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="trash-2" size={20} color={Colors.light.red} />
            </TouchableSurface>
          </View>
        </View>
      </View>
    </TouchableSurface>
  );
}

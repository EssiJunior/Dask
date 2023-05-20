import { useSignal } from "@dilane3/gx";
import { StyleSheet, View, Dimensions, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import User from "../../entities/user";
import TouchableSurface from "../buttons/TouchableSurface";
import Typography from "../text/Typography";
import MemberItem from "./MemberItem";

type SearchResultCardProps = {
  users: User[];
  loading: boolean;
  onSelect: (user: User) => void;
};

export default function SearchResultCard({
  users,
  loading,
  onSelect,
}: SearchResultCardProps) {
  return (
    <View style={styles.container}>
      <ScrollView>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={Colors.light.primary}
            style={{ marginTop: 15 }}
          />
        ) : users.length === 0 ? (
          <Typography
            text="No results found"
            fontSize={16}
            color={Colors.light.gray}
            style={{ marginTop: 20, textAlign: "center" }}
          />
        ) : (
          users.map((user) => (
            <>
              <TouchableSurface
                style={{ width: "100%" }}
                onPress={() => onSelect(user)}
              >
                <MemberItem member={user} type="search" disabled />
              </TouchableSurface>
            </>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 40,
    minHeight: 70,
    maxHeight: 300,
    backgroundColor: Colors.light.background,
    borderRadius: 5,
    elevation: 100,
  },
});

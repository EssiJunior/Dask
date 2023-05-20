import { ActivityIndicator, Dimensions, View } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../../components/buttons/Button";
import TextInput from "../../../../components/inputs/TextInput";
import HeaderText from "../../../../components/layouts/headers/HeaderText";
import Typography from "../../../../components/text/Typography";
import Colors from "../../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import MemberItem from "../../../../components/projects/MemberItem";
import { useSearchParams } from "expo-router";
import { ProjectsDataType } from "../../../../gx/signals";
import { useSignal } from "@dilane3/gx";
import { useEffect, useMemo, useState } from "react";
import SearchResultCard from "../../../../components/projects/SearchResultCard";
import User from "../../../../entities/user";
import { findUserByEmail } from "../../../../api/users";

export default function Members() {
  const params = useSearchParams();
  const projectId = params.id as string;

  // Global state
  const { projects } = useSignal<ProjectsDataType>("projects");

  // Local state
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const members = useMemo(() => {
    const project = projects.find((project) => project.id === projectId);

    if (project) return project.getMembers();

    return [];
  }, [projects]);

  // UseEffect

  useEffect(() => {
    const searchUsers = async () => {
      await handleSearch();
    }

    searchUsers();
  }, [search])

  // Handlers

  const handleChange = (text: string) => {
    setSearch(text);
    setReady(false);
  }

  const handleSearch = async () => {
    if (search.length === 0) return;

    setSearching(true);

    const { data } = await findUserByEmail(search);

    setSearching(false);

    if (data) {
      setSearchResults(data);
    }
  };

  const handleInvite = async () => {};

  const handleSelectUser = (user: User) => {
    setSearch(user.email);
    setSearchResults([]);
    setReady(true);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <HeaderText title="Members" />

      {members && (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          {!ready && search.length > 0 && (
            <View
              style={{
                position: "absolute",
                minHeight: 200,
                top: 80,
                left: 0,
                right: 0,
                alignItems: "center",
                zIndex: 2,
              }}
            >
              <SearchResultCard users={searchResults} loading={searching} onSelect={handleSelectUser} />
            </View>
          )}

          <View
            style={{
              position: "relative",
              width: "100%",
              paddingHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
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
              value={search}
              onChange={handleChange}
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

            <Button
              width={80}
              disabled={!ready || loading}
              onPress={handleInvite}
            >
              {loading ? (
                <ActivityIndicator size={23} color={Colors.light.background} />
              ) : (
                <Typography
                  text="Invite"
                  color={Colors.dark.text}
                  weight="bold"
                />
              )}
            </Button>
          </View>

          <View
            style={{
              marginTop: 20,
            }}
          >
            {members.map((member) => (
              <MemberItem key={member.uid} member={member} />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

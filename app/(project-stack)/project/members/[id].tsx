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
import { useActions, useSignal } from "@dilane3/gx";
import { useContext, useEffect, useMemo, useState } from "react";
import SearchResultCard from "../../../../components/projects/SearchResultCard";
import User from "../../../../entities/user";
import { findUserByEmail } from "../../../../api/users";
import { addMemberToProject } from "../../../../api/projects";
import { UserDataType } from "../../../../gx/signals/current-user";
import { WebsocketContext } from "../../../../contexts/Websocket";
import { WebSocketEvent } from "../../../../contexts/enum";
import useLoadProjects from "../../../../hooks/useLoadProjects";

export default function Members() {
  // Context
  const { dispatch } = useContext(WebsocketContext);

  const params = useSearchParams();
  const projectId = params.id as string;

  // Global state
  const { projects } = useSignal<ProjectsDataType>("projects");
  const { user } = useSignal<UserDataType>("currentUser");

  const { show: toast } = useActions("toast");
  const { addMember } = useActions("projects");

  // Local state
  const [search, setSearch] = useState("");
  const [member, setMember] = useState<User | null>(null);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const members = useMemo(() => {
    const project = projects.find((project) => project.id === projectId);

    if (project) return project.getMembers();

    return [];
  }, [JSON.stringify(projects)]);

  const owner = useMemo(() => {
    const project = projects.find((project) => project.id === projectId);

    if (project) return project.owner;

    return null;
  }, [projects]);

  // UseEffect

  useEffect(() => {
    const searchUsers = async () => {
      await handleSearch();
    };

    searchUsers();
  }, [search]);

  // Handlers

  const handleChange = (text: string) => {
    setSearch(text);
    setMember(null);
    setReady(false);
  };

  const handleSearch = async () => {
    if (search.length === 0) return;

    setSearching(true);

    const { data } = await findUserByEmail(search);

    setSearching(false);

    if (data) {
      setSearchResults(data);
    }
  };

  const handleInvite = async () => {
    setLoading(true);

    if (member) {
      const { data } = await addMemberToProject(projectId, member.uid);

      setLoading(false);

      if (data) {
        // Add member to global state
        addMember({ projectId, member });

        // Dispatch add member event to the websocket
        dispatch({
          type: WebSocketEvent.NEW_PROJECT_MEMBER,
          payload: {
            projectId,
            newMemberId: member.uid,
          },
        });

        // Reset search
        setSearch("");

        // Show toast
        toast({ message: "New member added to project", type: "success" });

        // Reset state to default
        setMember(null);
      }
    }
  };

  const handleSelectUser = (user: User) => {
    setSearch(user.email);
    setMember(user);
    setSearchResults([]);
    setReady(true);
  };

  const filterResults = () => {
    if (search.length === 0) return [];

    let filtered: User[] = [];

    if (user) {
      filtered = searchResults.filter((result) => result.uid !== user.uid);
    }

    for (let member of members) {
      filtered = filtered.filter((result) => result.uid !== member.uid);
    }

    return filtered;
  };

  const filterMembersPerDate = () => {
    const sorted = members.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    return sorted;
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
              <SearchResultCard
                users={filterResults()}
                loading={searching}
                onSelect={handleSelectUser}
              />
            </View>
          )}

          {user && owner && user.uid === owner.uid && (
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
                  <ActivityIndicator
                    size={23}
                    color={Colors.light.background}
                  />
                ) : (
                  <Typography
                    text="Invite"
                    color={Colors.dark.text}
                    weight="bold"
                  />
                )}
              </Button>
            </View>
          )}

          <View
            style={{
              marginTop: 20,
            }}
          >
            {filterMembersPerDate().map((member) => (
              <MemberItem key={member.uid} member={member} owner={owner} />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

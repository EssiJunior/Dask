import { useActions, useSignal } from "@dilane3/gx";
import {
  NetworkDataType,
  ProjectsDataType,
  TermsDataType,
  UserDataType,
} from "../gx/signals";
import { useEffect } from "react";
import { findAllProjects } from "../api/projects";
import User from "../entities/user";
import ProjectsRepository from "../storage/db/projects";

export default function useLoadProjects() {
  // Global state
  const { user } = useSignal<UserDataType>("currentUser");
  const { isInternetReachable, isConnected, ready } =
    useSignal<NetworkDataType>("network");
  const { sharedPostsLoaded } = useSignal<ProjectsDataType>("projects");
  const { read: termsRead } = useSignal<TermsDataType>("terms");

  const { show: toast } = useActions("toast");
  const { loadProjects, setSharedPostsLoaded } = useActions("projects");

  useEffect(() => {
    if (!sharedPostsLoaded && termsRead) {
      // Load projects
      handleLoadProjects(user);
    }
  }, [
    user,
    sharedPostsLoaded,
    isInternetReachable,
    isConnected,
    ready,
    termsRead,
  ]);

  const handleLoadProjects = async (user: User | null) => {
    // Load projects from local database
    const personalProjects = await ProjectsRepository.findAll();

    if (user) {
      if (!isInternetReachable) {
        toast({
          message: "Couldn't retrieve shared projects",
          type: "info",
        });
      } else {
        if (ready && isConnected) {
          // Load projects from firebase
          const { data, error } = await findAllProjects(user);

          if (data) {
            personalProjects.push(...data);
            setSharedPostsLoaded(true);
          } else {
            toast({
              type: "error",
              message: error,
            });
          }
        }
      }
    }

    // Update projects state
    loadProjects(personalProjects);
  };
}

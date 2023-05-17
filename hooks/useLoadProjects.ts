import { useActions, useSignal } from "@dilane3/gx";
import { UserDataType } from "../gx/signals";
import { useEffect } from "react";
import { findAllProjects } from "../api/projects";
import User from "../entities/user";
import ProjectsRepository from "../storage/db/projects";

export default function useLoadProjects() {
  // Global state
  const { user } = useSignal<UserDataType>("currentUser");

  const { show: toast } = useActions("toast");
  const { loadProjects } = useActions("projects");

  useEffect(() => {
    if (user) {
      // Load projects
      handleLoadProjects(user);
    }
  }, [user]);

  const handleLoadProjects = async (user: User) => {
    // Load projects from local database
    const personalProjects = await ProjectsRepository.findAll();

    // Load projects from firebase
    const { data, error } = await findAllProjects(user);

    if (data) {
      // Dispatch action to update projects
      loadProjects([...data, ...personalProjects]);
    } else {
      toast({
        type: "error",
        message: error,
      });
    }
  };
}

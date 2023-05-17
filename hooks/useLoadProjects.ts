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
    // Load projects
    handleLoadProjects(user);
  }, [user]);

  const handleLoadProjects = async (user: User | null) => {
    // Load projects from local database
    const personalProjects = await ProjectsRepository.findAll();

    if (user) {
      // Load projects from firebase
      const { data, error } = await findAllProjects(user);

      if (data) {
        personalProjects.push(...data);
      } else {
        toast({
          type: "error",
          message: error,
        });
      }
    }

    // Update projects state
    loadProjects(personalProjects);
  };
}

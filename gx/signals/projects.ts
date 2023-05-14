import { createSignal } from "@dilane3/gx";
import Project from "../../entities/project";

export type ProjectsDataType = {
  projects: Project[],
  selectedProject: Project | null
  loading: boolean
}

export const projectSignal = createSignal<ProjectsDataType>({
  name: "projects",
  state: {
    projects: [],
    selectedProject: null,
    loading: false
  },
  actions: {
    loadProjects: (state, payload: Project[]) => {
      state.projects = payload;
      state.loading = false;

      return state;
    },

    selectProject: (state, payload: Project) => {
      state.selectedProject = payload;

      return state;
    },

    addProject: (state, payload: Project) => {
      state.projects.push(payload);

      return state;
    },

    removeProject: (state, payload: string) => {
      state.projects = state.projects.filter(project => project.id !== payload);

      return state;
    }
  }
})
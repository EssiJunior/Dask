import { createSignal } from "@dilane3/gx";
import Project from "../../entities/project";
import Task from "../../entities/task";
import { TaskStatus } from '../../entities/task/index';

export type ProjectsDataType = {
  projects: Project[];
  selectedProject: Project | null;
  loading: boolean;
  sharedPostsLoaded: boolean;
};

export const projectSignal = createSignal<ProjectsDataType>({
  name: "projects",
  state: {
    projects: [],
    selectedProject: null,
    loading: false,
    sharedPostsLoaded: false,
  },
  actions: {
    loadProjects: (state, payload: Project[]) => {
      state.projects = payload;
      state.loading = false;

      return state;
    },

    setSharedPostsLoaded: (state, payload: boolean) => {
      state.sharedPostsLoaded = payload;

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
      state.projects = state.projects.filter(
        (project) => project.id !== payload
      );

      return state;
    },

    // Tasks
    addTask: (state, payload: { projectId: string; task: Task }) => {
      const project = state.projects.find(
        (project) => project.id === payload.projectId
      );

      if (project) {
        project.addTask(payload.task);
      }

      return state;
    },

    removeTask: (state, payload: { projectId: string; taskId: string }) => {
      const project = state.projects.find(
        (project) => project.id === payload.projectId
      );

      if (project) {
        project.removeTask(payload.taskId);
      }

      return state;
    },

    changeTaskStatus: (state, payload: { projectId: string, taskId: string, status: TaskStatus }) => {
      const project = state.projects.find(
        (project) => project.id === payload.projectId
      );

      if (project) {
        project.changeTaskStatus(payload.taskId, payload.status);
      }

      return state;
    }
  },
});

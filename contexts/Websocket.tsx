import { useAction, useActions, useSignal } from "@dilane3/gx";
import { createContext, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { NetworkDataType, UserDataType } from "../gx/signals";
import { WebSocketEvent } from "./enum";
import { WebSocketContextAction, WebSocketContextData } from "./type";
import { ProjectsDataType } from "../gx/signals/projects";
import { findTaskById } from "../api/tasks";

export const WebsocketContext = createContext<WebSocketContextData>({
  dispatch: (action: WebSocketContextAction) => {},
});

let socket = io("http://192.168.43.237:3333");

type WebSocketProviderProps = {
  children: React.ReactNode;
};

export default function WebsocketProvider({
  children,
}: WebSocketProviderProps) {
  // Global state
  const { user } = useSignal<UserDataType>("currentUser");
  const { projects } = useSignal<ProjectsDataType>("projects");
  const { isInternetReachable } = useSignal<NetworkDataType>("network");

  const { addTask } = useActions("projects");

  // Use Memo section

  const sharedProjects = useMemo(() => {
    if (!projects) return [];

    const projectsIds: string[] = [];

    projects.forEach((project) => {
      if (project.type === "shared") {
        projectsIds.push(project.id);
      }
    });

    return projectsIds;
  }, [projects]);

  // Use Effect section

  useEffect(() => {
    if (user) {
      if (isInternetReachable) {
        // Connect to the socket
        socket.connect();

        console.log(`connected as ${user.name}`);

        console.log("sharedProjects: ", sharedProjects)

        // Join projects rooms
        socket.emit(WebSocketEvent.JOIN, {
          userId: user.uid,
          sharedProjects,
        });
      } else {
        socket.disconnect();
      }
    }
  }, [isInternetReachable, user, sharedProjects]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");

      if (user) {
        console.log(`connected as ${user.name}`);

        console.log("sharedProjects: ", sharedProjects)

        // Join projects rooms
        socket.emit(WebSocketEvent.JOIN, {
          userId: user.uid,
          sharedProjects,
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    }
  }, [user, sharedProjects]);

  useEffect(() => {
    if (user) {
      // On add task
      socket.on(WebSocketEvent.ADD_TASK, async (data) => {
        const { taskId, projectId } = data;

        console.log("Received: ", data);

        // Get task from firebase
        const { data: task } = await findTaskById(taskId);

        // Add task to global state
        addTask({ projectId, task });
      });
    }

    return () => {
      socket.off(WebSocketEvent.ADD_TASK);
    }
  }, [user])

  // Emitter section

  /**
   *
   * @param {WebSocketContextAction} action
   */
  const dispatch = (action: WebSocketContextAction) => {
    switch (action.type) {
      case WebSocketEvent.JOIN:
        break;

      case WebSocketEvent.ADD_TASK:
        const { taskId, projectId } = action.payload;

        console.log(action.payload);

        socket.emit(WebSocketEvent.ADD_TASK, {
          taskId,
          projectId,
        });

        break;

      case WebSocketEvent.UPDATE_TASK:
        break;

      case WebSocketEvent.DELETE_TASK:
        break;

      case WebSocketEvent.NEW_PROJECT_MEMBER:
        break;

      default:
        break;
    }
  };

  return (
    <WebsocketContext.Provider value={{ dispatch }}>
      {children}
    </WebsocketContext.Provider>
  );
}

import { useAction, useActions, useSignal } from "@dilane3/gx";
import { createContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { NetworkDataType, ToastDataType, UserDataType } from "../gx/signals";
import { WebSocketEvent } from "./enum";
import { WebSocketContextAction, WebSocketContextData } from "./type";
import { ProjectsDataType } from "../gx/signals/projects";
import { findTaskById } from "../api/tasks";
import { findUserByEmail } from "../api/users";
import { findUser } from "../api/auth";
import { Audio } from "expo-av";

export const WebsocketContext = createContext<WebSocketContextData>({
  dispatch: (action: WebSocketContextAction) => {},
});

let socket = io("https://dask-websocket.onrender.com");

const notificationSound = require("../assets/sounds/pop.mp3");

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
  const { show: toast } = useActions("toast");

  const { addTask, removeTask, changeTaskStatus, addMember } =
    useActions("projects");

  // Local state
  const [sound, setSound] = useState<Audio.Sound | null>(null);

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
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (user) {
      if (isInternetReachable) {
        // Connect to the socket
        socket.connect();

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
      if (user) {
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
    };
  }, [user, sharedProjects]);

  useEffect(() => {
    if (user) {
      // On add task
      socket.on(WebSocketEvent.ADD_TASK, async (data) => {
        const { taskId, projectId } = data;

        // Get task from firebase
        const { data: task } = await findTaskById(taskId);

        // Add task to global state
        addTask({ projectId, task });

        // Play sound
        playSound();

        // Show toast
        toast({
          type: "info",
          message: "New task added",
        });
      });

      // On delete task
      socket.on(WebSocketEvent.REMOVE_TASK, async (data) => {
        const { taskId, projectId } = data;

        // Delete task from global state
        removeTask({ projectId, taskId });

        // Play sound
        playSound();

        // Show toast
        toast({
          type: "info",
          message: "Task deleted",
        });
      });

      // On update task
      socket.on(WebSocketEvent.UPDATE_TASK, async (data) => {
        const {
          task: { id: taskId, status },
          project: projectId,
        } = data;

        if (status) {
          // Update task from global state
          changeTaskStatus({ projectId, taskId, status });

          // Play sound
          playSound();

          // Show toast
          toast({
            type: "info",
            message: "Task status changed",
          });
        }
      });

      // On new project member
      socket.on(WebSocketEvent.NEW_PROJECT_MEMBER, async (data) => {
        const { projectId, newMemberId } = data;

        // Get user from firebase
        const { data: user } = await findUser(newMemberId);

        if (user) {
          // Add user to project
          addMember({ projectId, member: user });
        }

        // Play sound
        playSound();

        // Show toast
        toast({
          type: "info",
          message: "New member added",
        });
      });
    }

    return () => {
      socket.off(WebSocketEvent.ADD_TASK);
      socket.off(WebSocketEvent.REMOVE_TASK);
      socket.off(WebSocketEvent.UPDATE_TASK);
    };
  }, [user]);

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
        socket.emit(WebSocketEvent.ADD_TASK, action.payload);

        break;

      case WebSocketEvent.UPDATE_TASK:
        socket.emit(WebSocketEvent.UPDATE_TASK, action.payload);

        break;

      case WebSocketEvent.REMOVE_TASK:
        socket.emit(WebSocketEvent.REMOVE_TASK, action.payload);

        break;

      case WebSocketEvent.NEW_PROJECT_MEMBER:
        socket.emit(WebSocketEvent.NEW_PROJECT_MEMBER, action.payload);

        break;

      default:
        break;
    }
  };

  // Some handlers

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(notificationSound);

    setSound(sound);

    if (sound) await sound.playAsync();
  }

  return (
    <WebsocketContext.Provider value={{ dispatch }}>
      {children}
    </WebsocketContext.Provider>
  );
}

// Users operations
import {
  addDoc,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getCollectionReference, getDocumentReference } from "..";
import { CreateTaskDto } from "./type";
import User from "../../entities/user";
import Project from "../../entities/project";
import Task, { TaskStatus } from "../../entities/task";
import { findUser } from "../auth";

/**
 * Create task and save it to firestore
 * @param {CreateTaskDto} task
 */
export const createTask = async (task: CreateTaskDto) => {
  const tasksRef = getCollectionReference("tasks");
  const userDocRef = getDocumentReference(task.projectId, "projects");

  try {
    const now = Date.now();

    const payload = {
      title: task.title,
      description: task.description,
      status: TaskStatus.TODO,
      createdAt: new Date(now),
      updatedAt: new Date(now),
      project: userDocRef,
      workers: [],
    };

    const docRef = await addDoc(tasksRef, payload);

    if (!docRef) return { error: "Error creating task" };

    const taskId = docRef.id;

    // Create a new task object
    const newTask = new Task({
      id: taskId,
      title: payload.title,
      description: payload.description,
      status: payload.status,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
      projectId: task.projectId,
      workers: payload.workers,
    });

    return { data: newTask };
  } catch (error) {
    console.error(error);

    return { error };
  }
};

/**
 * Find all tasks by project id
 * @param {string} projectId
 */
export const findAllTasksByProjectId = async (projectId: string) => {
  const tasksRef = getCollectionReference("tasks");
  const projectRef = getDocumentReference(projectId, "projects");

  try {
    const q = query(tasksRef, where("project", "==", projectRef));

    const querySnapshot = await getDocs(q);

    const tasks: Task[] = [];

    for (let doc of querySnapshot.docs) {
      const data = doc.data();

      // Load workers
      const workers: User[] = [];

      for (let workerData of data.workers) {
        const workderId = workerData.id;

        const { data: worker } = await findUser(workderId);

        if (worker) workers.push(worker);
      }

      const task = new Task({
        id: doc.id,
        title: data.title,
        description: data.description,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        projectId,
        workers,
      });

      tasks.push(task);
    }

    return { data: tasks };
  } catch (error) {
    console.error(error);

    return { error };
  }
};

/**
 * Delete task by id
 * @param {string} taskId
 */
export const deleteTaskById = async (taskId: string) => {
  console.log("deleteTaskById", taskId);
  const taskRef = getDocumentReference(taskId, "tasks");

  try {
    await deleteDoc(taskRef);

    return { data: true };
  } catch (error) {
    console.error(error);

    return { error };
  }
};

/**
 * Update task status
 * @param {string} taskId
 * @param {TaskStatus} status
 */
export const updateTaskStatus = async (taskId: string, status: TaskStatus) => {
  const taskRef = getDocumentReference(taskId, "tasks");

  try {
    await updateDoc(taskRef, {
      status,
    });

    return { data: true };
  } catch (error) {
    console.error(error);

    return { error };
  }
};

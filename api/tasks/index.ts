// Users operations
import {
  addDoc,
  deleteDoc,
  getDoc,
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
 * Find task by id
 * @param taskId 
 */
export const findTaskById = async (taskId: string) => {
  const taskRef = getDocumentReference(taskId, "tasks");

  try {
    const doc = await getDoc(taskRef);

    if (!doc.exists()) return { error: "Task not found" };

    const data = doc.data();

    // Load workers
    const workers: User[] = [];

    for (let workerData of data.workers) {
      const workderId = workerData.id;

      const { data: worker } = await findUser(workderId);
      
      if (worker) workers.push(worker);
    }

    // Create a new task object
    const task = new Task({
      id: doc.id,
      title: data.title,
      description: data.description,
      status: data.status,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      projectId: data.project.id,
      workers,
    });

    return { data: task };
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

/**
 * Assign task to members
 * @params {string} taskId
 * @params {string[]} membersId
 */
export const assignTaskToMembers = async (taskId: string, membersId: string[]) => {
  const taskRef = getDocumentReference(taskId, "tasks")
  const membersRef = [];

  for (let memberId of membersId) {
    const memberRef = getDocumentReference(memberId, "users");

    membersRef.push(memberRef);
  }

  try {
    // Add members to the task
    await updateDoc(taskRef, {
      workers: membersRef
    })

    return { data: true }
  } catch (error) {
    console.log(error);

    return { error }
  }
}
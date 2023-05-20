// Users operations
import {
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  getDoc,
  updateDoc,
  or,
} from "firebase/firestore";
import { getCollectionReference, getDocumentReference } from "..";
import { CreateProjectDto } from "./type";
import User from "../../entities/user";
import Project from "../../entities/project";
import { generateColor } from "../../utils";
import Task from "../../entities/task";
import { findAllTasksByProjectId } from "../tasks";
import { findUser } from "../auth";

/**
 * Create project and save it to firestore
 * @param project
 */
export const createProject = async (project: CreateProjectDto) => {
  const projectRef = getCollectionReference("projects");
  const userDocRef = getDocumentReference(project.owner.uid, "users");

  try {
    const payload = {
      name: project.name,
      description: project.description,
      avatar: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      color: generateColor(),
      members: [],
      owner: userDocRef,
    };

    const docRef = await addDoc(projectRef, payload);

    const projectId = docRef.id;

    // Create a new project object
    const newProject = new Project({
      id: projectId,
      ...payload,
      owner: project.owner,
      type: "shared",
      createdAt: new Date(payload.createdAt),
      updatedAt: new Date(payload.updatedAt),
    });

    return { data: newProject };
  } catch (error) {
    console.error(error);

    return { error };
  }
};

/**
 * Load projects from firestore
 * @param user
 */
export const findAllProjects = async (user: User) => {
  const projectsRef = getCollectionReference("projects");
  const userDocRef = getDocumentReference(user.uid, "users");

  console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")

  try {
    // Make a query to get all projects where the user is a member
    const querySnapshot = query(
      projectsRef,
      or(
        where("owner", "==", userDocRef),
        where("members", "array-contains", userDocRef)
      )
    );

    console.log({userDocRef})

    const snapshot = await getDocs(querySnapshot);

    const projects: Project[] = [];

    for (const doc of snapshot.docs) {
      // Load tasks
      const { data: tasks } = await findAllTasksByProjectId(doc.id);

      // Load members
      const members: User[] = [];

      for (let workerData of doc.data().members) {
        const workderId = workerData.id;

        const { data: member } = await findUser(workderId);

        if (member) members.push(member);
      }

      const project = new Project({
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        avatar: doc.data().avatar,
        createdAt: new Date(doc.data().createdAt),
        updatedAt: new Date(doc.data().updatedAt),
        color: doc.data().color,
        members,
        owner: user,
        type: "shared",
        tasks: tasks || [],
      });

      projects.push(project);
    }

    console.log({ projects });

    return { data: projects };
  } catch (error) {
    console.error(error);

    return { error: "Something went wrong while fetching all projects" };
  }
};

/**
 * Delete project from firestore
 * @param {Project} project
 */
export const deleteProject = async (project: Project) => {
  const projectRef = getDocumentReference(project.id, "projects");

  try {
    // Delete tasks of the project
    for (const task of project.tasks) {
      const taskRef = getDocumentReference(task.id, "tasks");

      await deleteDoc(taskRef);
    }

    // Delete project
    await deleteDoc(projectRef);

    return { data: true };
  } catch (error) {
    console.error(error);

    return { error: "Something went wrong while deleting project" };
  }
};

/**
 * Add a member to a project
 * @param {string} projectId
 * @param {string} userId
 */
export const addMemberToProject = async (projectId: string, userId: string) => {
  const projectRef = getDocumentReference(projectId, "projects");
  const userRef = getDocumentReference(userId, "users");

  try {
    const projectDoc = await getDoc(projectRef);
    const projectData = projectDoc.data();

    if (projectData) {
      await updateDoc(projectRef, {
        members: [...projectData.members, userRef],
      });
      return { data: true };
    }

    return { error: "Project not found" };
  } catch (error) {
    console.error(error);

    return { error: "Something went wrong while adding member to project" };
  }
};

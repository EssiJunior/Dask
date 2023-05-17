// Users operations
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { getCollectionReference, getDocumentReference } from "..";
import { CreateProjectDto } from "./type";
import User from "../../entities/user";
import Project from "../../entities/project";
import { generateColor } from '../../utils';

/**
 * Create project and save it to firestore
 * @param project
 */
export const createProject = async (project: CreateProjectDto) => {
  const projectRef = getCollectionReference("projects");
  const userDocRef = getDocumentReference("users", project.owner.uid);

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
  const userDocRef = getDocumentReference("users", user.uid);

  try {
    // Make a query to get all projects where the user is a member
    const querySnapshot = query(projectsRef, where("owner", "==", userDocRef));

    const snapshot = await getDocs(querySnapshot);

    const projects: Project[] = [];

    snapshot.forEach((doc) => {
      const project = new Project({
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        avatar: doc.data().avatar,
        createdAt: new Date(doc.data().createdAt),
        updatedAt: new Date(doc.data().updatedAt),
        color: doc.data().color,
        members: doc.data().members,
        owner: user,
        type: "shared"
      });

      projects.push(project);
    });

    return { data: projects };
  } catch(error) {
    console.error(error);

    return { error: "Something went wrong while fetching all projects" };
  }
}
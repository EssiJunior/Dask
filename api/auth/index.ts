// Users operations
import { auth } from "../../firebase";
import { getDoc, setDoc } from "firebase/firestore";
import { getDocumentReference } from "..";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { CreateUserDto, LoginUserDto } from "./type";
// import { sleep } from "app/utils/time";

/**
 * Find an admin
 * @param {String} uid
 */
const findUser = async (uid: string) => {
  try {
    const userDocumentRef = getDocumentReference(uid, "users");

    const userDoc = await getDoc(userDocumentRef);

    if (userDoc.exists()) {
      return { data: userDoc.data() };
    }

    return { error: "User not found" };
  } catch (err) {
    console.log(err);

    return { error: "Something went wrong while trying to find the admin" };
  }
};

/**
 * Get the current user
 * @param {Function} login
 */
const getCurrentUser = async (login: (user: any) => void) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const { uid } = user;

      const { data: userData, error } = await findUser(uid);

      if (userData) {
        console.log(userData);

        login(userData);
      } else {
        console.log(error);
      }
    } else {
      console.log("No user is signed in");
    }
  });
};

/**
 * Create a user
 * @param {CreateUserDto} payload
 */
const createUser = async (payload: CreateUserDto) => {
  try {
    // destructuration of data
    const { name, email, password } = payload;

    if (!name || !email || !password)
      return { error: "Please provide all the required fields" };

    /**
     * TODO: Before creating a user, check if the email is not already used
     */

    // Create an instance of a User in firebase
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // creation date declaration
    const createdAt = Date.now();

    // Get the new user id
    const uid = credentials.user.uid;

    // Get a user collection reference
    const userDocument = getDocumentReference(uid, "users");

    // Insertion of the user in firestore
    await setDoc(userDocument, {
      name,
      email,
      createdAt,
      avatar: "",
    });

    if (credentials) {
      return { data: uid };
    }
  } catch (err) {
    console.error(err);

    return {
      error:
        "Something went wrong while creating the user. Please try again later",
    };
  }
};

/**
 * Login a user
 * @param {LoginAdminDto} payload
 */
const loginUser = async (payload: LoginUserDto) => {
  const { email, password } = payload;

  if (!email || !password)
    return { error: "Please provide all the required fields" };

  try {
    // Login the user
    const credentials = await signInWithEmailAndPassword(auth, email, password);

    if (credentials) {
      return { data: credentials.user.uid };
    }

    return { error: "User not found" };
  } catch (err) {
    console.log(err);

    return {
      error: "Something went wrong while trying to connect the admin",
    };
  }
};

/**
 * Signout a user
 * @returns {any}
 */
const logoutUser = async (): Promise<any> => {
  try {
    // SignOut a user
    await signOut(auth);

    return { data: true };
  } catch (err) {
    console.log(err);

    return { error: err };
  }
};

export { findUser, createUser, loginUser, logoutUser, getCurrentUser };

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
  User as UserCredential,
} from "firebase/auth";
import { CreateUserDto, LoginUserDto } from "./type";
import User from "../../entities/user";
import storage from "../../storage";
import UsersRepository from "../../storage/db/users";
import { DASK_USER_ID } from "../../constants";
import { generateColor } from "../../utils/index";

/**
 * Find an admin
 * @param {String} uid
 */
const findUser = async (uid: string) => {
  try {
    const userDocumentRef = getDocumentReference(uid, "users");

    const userDoc = await getDoc(userDocumentRef);

    if (userDoc.exists()) {
      const data = userDoc.data();

      const payload = {
        uid,
        name: data.name,
        color: data.color,
        email: data.email,
        avatar: data.avatar,
        createdAt: new Date(data.createdAt),
      };

      return { data: new User(payload) };
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
      const uid = user.uid;

      const { data: currentUser, error } = await findUser(uid);

      if (currentUser) {
        // Login the user
        login(currentUser);

        // Save uid into the local storage
        await storage.setItem(DASK_USER_ID, uid);

        // Save user into the local database
        await UsersRepository.insert({
          uid: currentUser.uid,
          name: currentUser.name,
          color: currentUser.color || generateColor(),
          email: currentUser.email,
          avatar: currentUser.avatar,
          createdAt: currentUser.createdAt.getTime(),
        });
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
      color: generateColor(),
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
 * Login a user with a token
 * @param {String} token
 **/
const loginWithToken = async (token: string) => {
  try {
    const credentials = await signInWithCustomToken(auth, token);

    if (credentials) {
      const { uid } = credentials.user;

      const { data: userData, error } = await findUser(uid);

      if (userData) {
        const payload = {
          uid,
          name: userData.name,
          color: userData.color,
          email: userData.email,
          avatar: userData.avatar,
          createdAt: new Date(userData.createdAt),
        };

        const currentUser = new User(payload);

        return { data: currentUser };
      } else {
        console.log(error);

        return { error };
      }
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

export {
  findUser,
  createUser,
  loginUser,
  loginWithToken,
  logoutUser,
  getCurrentUser,
};

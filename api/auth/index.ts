// Users operations
import { auth } from "../../firebase";
import { getDoc, setDoc } from "firebase/firestore";
import { getDocumentReference } from "..";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { CreateUserDto, LoginUserDto } from "./type";
// import { sleep } from "app/utils/time";

/**
 * Get the current user
 * @param {(user: Admin) => void} globalStateLogin
 */
// const getCurrentUser = (globalStateLogin: (user: Admin) => void) => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const uid = user.uid;

//       try {
//         const getUserData = async () => {
//           // Get info of the current user basing on his user id
//           const { data } = await findAdmin(uid);

//           console.log({ data, uid });

//           if (data) {
//             // Get the user data
//             const { name, email, createdAt } = data;

//             // Create a new instance of a user
//             const user = new Admin(uid, email, name, createdAt);

//             // Set the user in the global state
//             globalStateLogin(user);

//             return;
//           }

//           // Redirect to the login page
//           window.location.href = "/auth/signin";

//           return;
//         };

//         getUserData();
//       } catch (err) {
//         console.log({ error: "Something went wrong" });

//         // Redirect to the login page
//         window.location.href = "/auth/signin";
//       }
//     } else {
//       console.log({ error: "No admin user connected" });

//       sleep(2000).then(() => {
//         // Redirect to the login page
//         window.location.href = "/auth/signin";
//       });
//     }
//   });
// };

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

    return { data: true };
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

    console.log({ credentials });

    if (credentials) {
      return { data: true };
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

export { createUser, loginUser, logoutUser };

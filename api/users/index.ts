// Users operations
import { auth } from "../../firebase";
import { getDoc, getDocs, or, query, setDoc, where } from "firebase/firestore";
import { getDocumentReference } from "..";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signOut,
  User as UserCredential,
} from "firebase/auth";
import User from "../../entities/user";
import storage from "../../storage";
import UsersRepository from "../../storage/db/users";
import { DASK_USER_ID } from "../../constants";
import { generateColor } from "../../utils/index";
import { getCollectionReference } from "../index";

/**
 * Search for a user by email
 * @param {String} email
 */
export const findUserByEmail = async (email: string) => {
  const usersCollectionRef = getCollectionReference("users");

  try {
    const querySnapshot = query(
      usersCollectionRef,
      where("email", ">=", email.toLowerCase())
    );

    const snapshot = await getDocs(querySnapshot);

    const users: User[] = [];

    for (let user of snapshot.docs) {
      const userData = user.data();

      const newUser = new User({
        uid: user.id,
        email: userData.email,
        name: userData.name,
        avatar: userData.avatar,
        color: userData.color || generateColor(),
        createdAt: new Date(userData.createdAt),
      });

      users.push(newUser);

      return { data: users };
    }

    return { error: "User not found" };
  } catch (err) {
    console.log(err);

    return { error: "Something went wrong while trying to find the user" };
  }
};

/**
 * Check if the email is already in use
 * @param {String} email
 */
export const checkEmail = async (email: string) => {
  const usersCollectionRef = getCollectionReference("users");

  try {
    const querySnapshot = query(
      usersCollectionRef,
      where("email", "==", email.toLowerCase()),
    );

    const snapshot = await getDocs(querySnapshot);

    if (snapshot.empty) {
      return { data: false };
    }

    return { data: true };
  } catch (err) {
    console.log(err);

    return { error: "Something went wrong while trying to check the email" };
  }
}

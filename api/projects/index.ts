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
import { CreateProjectDto, UpdateProjectDto } from "./type";
import User from "../../entities/user";
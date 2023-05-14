import { createStore } from "@dilane3/gx";
import {
  currentUserSignal,
  projectSignal,
  termsSignal,
  toastSignal,
} from "../signals";

export default createStore([
  termsSignal,
  currentUserSignal,
  toastSignal,
  projectSignal,
]);

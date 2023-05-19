import { createStore } from "@dilane3/gx";
import {
  currentUserSignal,
  modalSignal,
  networkSignal,
  projectSignal,
  termsSignal,
  toastSignal,
} from "../signals";

export default createStore([
  termsSignal,
  currentUserSignal,
  projectSignal,
  toastSignal,
  modalSignal,
  networkSignal
]);

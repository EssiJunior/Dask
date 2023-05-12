import { createStore } from "@dilane3/gx";
import { currentUserSignal, termsSignal, toastSignal } from "../signals";

export default createStore([termsSignal, currentUserSignal, toastSignal]);

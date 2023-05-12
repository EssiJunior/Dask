import { createStore } from "@dilane3/gx";
import { currentUserSignal, termsSignal } from "../signals";

export default createStore([termsSignal, currentUserSignal]);
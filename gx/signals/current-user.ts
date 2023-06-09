import { createSignal } from "@dilane3/gx";
import User from "../../entities/user";

export type UserDataType = {
  user: User | null,
  loading: boolean,
  ready: boolean
}

export const currentUserSignal = createSignal<UserDataType>({
  name: "currentUser",
  state: {
    user: null,
    loading: true,
    ready: true
  },
  actions: {
    login: (state, payload: User) => {
      state.user = payload;
      state.loading = false;
      state.ready = false;

      return state;
    },

    logout: (state) => {
      state.user = null;
      state.loading = false;

      return state;
    },

    setReady: (state, payload: boolean) => {
      state.ready = payload;

      return state;
    }
  }
})
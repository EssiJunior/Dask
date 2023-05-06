import { createSignal } from "@dilane3/gx";

export type TermsDataType = {
  read: boolean,
  loading: boolean
}

export const termsSignal = createSignal<TermsDataType>({
  name: "terms",
  state: {
    read: false,
    loading: true
  },
  actions: {
    setTermsRead: (state, payload: boolean) => {
      state.read = payload;
      state.loading = false;

      return state;
    }
  }
})
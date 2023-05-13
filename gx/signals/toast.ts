import { createSignal } from "@dilane3/gx";

export type ToastDataType = {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
}

export const toastSignal = createSignal<ToastDataType>({
  name: 'toast',
  state: {
    message: '',
    type: 'success',
    visible: false
  },
  actions: {
    show: (state, payload) => {
      state.message = payload.message;
      state.type = payload.type;
      state.visible = true;

      return state;
    },

    hide: (state) => {
      state.visible = false;

      return state;
    }
  }
})
import { createSignal } from "@dilane3/gx";
import { ModalTypes } from '../../components/modals/type';

export type ModalStateType = {
  name: ModalTypes,
  open: boolean,
  data: any
}

export const modalSignal = createSignal<ModalStateType>({
  name: 'modal',
  state: {
    name: ModalTypes.Default,
    open: false,
    data: null
  },
  actions: {
    open: (state, payload: { name: ModalTypes, data: any }) => {
      state.name = payload.name;
      state.data = payload.data;
      state.open = true;

      return state;
    },

    close: (state) => {
      state.name = ModalTypes.Default;
      state.data = null;
      state.open = false;

      return state;
    }
  }
})
import { createSignal } from "@dilane3/gx";

export type NetworkDataType = {
  isConnected: boolean,
  isInternetReachable: boolean,
  ready: boolean
}

export const networkSignal = createSignal<NetworkDataType>({
  name: "network",
  state: {
    isConnected: true,
    isInternetReachable: true,
    ready: false
  },
  actions: {
    changeNetworkStats: (state, payload: NetworkDataType) => {
      if (state.isInternetReachable !== payload.isInternetReachable) {
        state = payload
      }

      return state
    }
  }
})
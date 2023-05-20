import { WebSocketEvent } from "./enum";

export type WebSocketContextAction = {
  type: WebSocketEvent;
  payload: any;
};

export type WebSocketContextData = {
  dispatch: (action: WebSocketContextAction) => void;
};
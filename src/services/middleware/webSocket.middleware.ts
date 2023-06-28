import type { Middleware } from 'redux';
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

export type WsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<any>;
};

export const wsMiddleware = (wsActions: WsActionTypes): Middleware => {
  return store => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      let url = '';
      const { wsConnect, onOpen, onClose, onError, onMessage } = wsActions;

      if (wsConnect.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError('Web socket Error'));
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch(onMessage(parsedData));
        };

        socket.onclose = () => {
          dispatch(onClose());
        };
      }

      next(action);
    };
  };
};

export default wsMiddleware;

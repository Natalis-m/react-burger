import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createdOrderReducer from './slices/createdOrderSlice';
import currentIngredientReducer from './slices/currentIngredientSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import getIngredientsReducer from './slices/getIngredientsSlice';
import userReducer from './slices/userSlice';
import wsMiddleware, { WsActionTypes } from './middleware/webSocket.middleware';
import ordersReducer from './slices/ordersReducer';
import {
  connectAll,
  connectMy,
  disconnectAll,
  disconnectMy,
  wsCloseAll,
  wsCloseMy,
  wsErrorAll,
  wsErrorMy,
  wsMessageAll,
  wsMessageMy,
  wsOpenAll,
  wsOpenMy
} from './slices/ordersActions';

const wsActionsAll: WsActionTypes = {
  wsConnect: connectAll,
  wsDisconnect: disconnectAll,
  onOpen: wsOpenAll,
  onClose: wsCloseAll,
  onError: wsErrorAll,
  onMessage: wsMessageAll
};

const wsActionsMy: WsActionTypes = {
  wsConnect: connectMy,
  wsDisconnect: disconnectMy,
  onOpen: wsOpenMy,
  onClose: wsCloseMy,
  onError: wsErrorMy,
  onMessage: wsMessageMy
};

const allOrdersMiddleware = wsMiddleware(wsActionsAll);
const myOrdersMiddleware = wsMiddleware(wsActionsMy);

export const store = configureStore({
  reducer: {
    getIngredientsReducer,
    burgerConstructorReducer,
    createdOrderReducer,
    currentIngredientReducer,
    userReducer,
    ordersReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([allOrdersMiddleware, myOrdersMiddleware])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

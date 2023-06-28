import { createAction } from '@reduxjs/toolkit';

export const connectAll = createAction<string, 'ALL_ORDERS_CONNECT'>('ALL_ORDERS_CONNECT');
export const disconnectAll = createAction('ALL_ORDERS_DISCONNECT');
export const wsOpenAll = createAction('ALL_ORDERS_WS_OPEN');
export const wsCloseAll = createAction('ALL_ORDERS_WS_CLOSE');
export const wsMessageAll = createAction<any, 'ALL_ORDERS_WS_MESSAGE'>('ALL_ORDERS_WS_MESSAGE');
export const wsErrorAll = createAction<string, 'ALL_ORDERS_WS_ERROR'>('ALL_ORDERS_WS_ERROR');

export const connectMy = createAction<string, 'MY_ORDERS_CONNECT'>('MY_ORDERS_CONNECT');
export const disconnectMy = createAction('MY_ORDERS_DISCONNECT');
export const wsOpenMy = createAction('MY_ORDERS_WS_OPEN');
export const wsCloseMy = createAction('MY_ORDERS_WS_CLOSE');
export const wsMessageMy = createAction<any, 'MY_ORDERS_WS_MESSAGE'>('MY_ORDERS_WS_MESSAGE');
export const wsErrorMy = createAction<string, 'MY_ORDERS_WS_ERROR'>('MY_ORDERS_WS_ERROR');

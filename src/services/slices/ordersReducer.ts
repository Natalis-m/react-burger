import { createReducer } from '@reduxjs/toolkit';
import {
  wsCloseAll,
  wsCloseMy,
  wsErrorAll,
  wsErrorMy,
  wsMessageAll,
  wsMessageMy,
  wsOpenAll,
  wsOpenMy
} from './ordersActions';

export type OrderType = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: 'created' | 'pending' | 'done';
  updatedAt: string;
  _id: string;
};

export type OrdersStore = {
  connectionError: string;
  allOrders: {
    orders: OrderType[];
    totalOrders: number;
    totalOrdersToday: number;
    status: 'connect' | 'disconnect';
  };
  myOrders: {
    orders: OrderType[];
    totalOrders: number;
    totalOrdersToday: number;
    status: 'connect' | 'disconnect';
  };
};

export const initialState: OrdersStore = {
  connectionError: '',
  allOrders: {
    orders: [],
    totalOrders: 0,
    totalOrdersToday: 0,
    status: 'disconnect'
  },
  myOrders: {
    orders: [],
    totalOrders: 0,
    totalOrdersToday: 0,
    status: 'disconnect'
  }
};

const orderSort = (a: OrderType, b: OrderType) => {
  const dateA = new Date(a.updatedAt);
  const dateB = new Date(b.updatedAt);

  return dateB.getTime() - dateA.getTime();
};

const ordersReducer = createReducer(initialState, builder => {
  builder
    .addCase(wsOpenAll, state => {
      state.connectionError = '';
      state.allOrders.status = 'connect';
    })
    .addCase(wsOpenMy, state => {
      state.connectionError = '';
      state.myOrders.status = 'connect';
    })
    .addCase(wsCloseAll, state => {
      console.log('Socket all orders closed');
      state.allOrders.status = 'disconnect';
    })
    .addCase(wsCloseMy, state => {
      console.log('Socket my orders closed');
      state.myOrders.status = 'disconnect';
    })
    .addCase(wsErrorAll, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsErrorMy, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsMessageAll, (state, action) => {
      const ordersArr = ((action.payload?.orders ?? []) as OrderType[]).sort(orderSort);
      const totalOrders = action.payload?.total;
      const totalOrdersToday = action.payload?.totalToday;

      if (ordersArr) {
        state.allOrders.orders = [...ordersArr];
        state.allOrders.totalOrders = totalOrders;
        state.allOrders.totalOrdersToday = totalOrdersToday;
      }
    })
    .addCase(wsMessageMy, (state, action) => {
      const ordersArr = ((action.payload?.orders ?? []) as OrderType[]).sort(orderSort);
      const totalOrders = action.payload?.total;
      const totalOrdersToday = action.payload?.totalToday;

      if (ordersArr) {
        state.myOrders.orders = [...ordersArr];
        state.myOrders.totalOrders = totalOrders;
        state.myOrders.totalOrdersToday = totalOrdersToday;
      }
    });
});

export default ordersReducer;

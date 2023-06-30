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
  allOrders: { orders: OrderType[]; totalOrders: number; totalOrdersToday: number };
  myOrders: { orders: OrderType[]; totalOrders: number; totalOrdersToday: number };
};

export const initialState: OrdersStore = {
  connectionError: '',
  allOrders: {
    orders: [],
    totalOrders: 0,
    totalOrdersToday: 0
  },
  myOrders: {
    orders: [],
    totalOrders: 0,
    totalOrdersToday: 0
  }
};

const ordersReducer = createReducer(initialState, builder => {
  builder
    .addCase(wsOpenAll, state => {
      state.connectionError = '';
    })
    .addCase(wsOpenMy, state => {
      state.connectionError = '';
    })
    .addCase(wsCloseAll, () => {
      console.log('Socket all orders closed');
    })
    .addCase(wsCloseMy, () => {
      console.log('Socket my orders closed');
    })
    .addCase(wsErrorAll, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsErrorMy, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsMessageAll, (state, action) => {
      const ordersArr = action.payload?.orders as OrderType[];
      const totalOrders = action.payload?.total;
      const totalOrdersToday = action.payload?.totalToday;

      if (ordersArr) {
        state.allOrders.orders = [...ordersArr];
        state.allOrders.totalOrders = totalOrders;
        state.allOrders.totalOrdersToday = totalOrdersToday;
      }
    })
    .addCase(wsMessageMy, (state, action) => {
      const ordersArr = action.payload?.orders as OrderType[];
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

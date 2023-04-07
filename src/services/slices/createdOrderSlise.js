import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/api';
import axios from 'axios';

export const sendBurger = createAsyncThunk('createdOrder/sendBurger', async ingredientsArr => {
  const { data } = await axios.post(`${BASE_URL}/orders`, {
    ingredients: ingredientsArr
  });
  return data;
});

const initialState = {
  name: 'Ваш бургер',
  order: {
    number: 0
  },
  success: true
};

const createdOrderSlise = createSlice({
  name: 'createdOrder',
  initialState,
  reducers: {},
  extraReducers: {
    [sendBurger.pending]: state => {
      state = [];
    },
    [sendBurger.fulfilled]: (state, action) => {
      return { ...action.payload };
    },
    [sendBurger.rejected]: (state, error) => {
      console.log('Error:', error);
    }
  }
});

export default createdOrderSlise.reducer;

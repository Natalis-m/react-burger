import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/api';
import axios from 'axios';

export const sendBurger = createAsyncThunk(
  'createdOrder/sendBurger',
  async (ingredientsArr: string[]) => {
    const { data } = await axios.post(`${BASE_URL}/orders`, {
      ingredients: ingredientsArr
    });
    return data;
  }
);

export const initialState = {
  name: 'Ваш бургер',
  order: {
    number: 0
  },
  success: true
};

const createdOrderSlice = createSlice({
  name: 'createdOrder',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(sendBurger.fulfilled, (_state, action) => {
      return { ...action.payload };
    });
    builder.addCase(sendBurger.rejected, (_state, action) => {
      console.log('Error:', action.error);
    });
  }
});

export default createdOrderSlice.reducer;

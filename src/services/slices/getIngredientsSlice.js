import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/api';
import axios from 'axios';

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
  const { data } = await axios.get(`${BASE_URL}/ingredients`);

  return data;
});

const initialState = {
  items: [],
  status: 'loading'
};

const getIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchIngredients.pending]: state => {
      state.status = 'loading';
    },
    [fetchIngredients.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.items = data.map(e => ({ ...e, count: 0 }));
      state.status = 'success';
    },
    [fetchIngredients.rejected]: (state, error) => {
      state.status = 'error';
      state.items = [];
      console.log('Error:', error);
    }
  }
});

export default getIngredientsSlice.reducer;

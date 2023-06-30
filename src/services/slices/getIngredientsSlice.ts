import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/api';
import axios from 'axios';
import { Ingredient } from '../../model/ingredient.model';

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
  const { data } = await axios.get(`${BASE_URL}/ingredients`);

  return data;
});

interface stateType {
  items: Ingredient[];
  status: 'loading' | 'success' | 'error';
}

export const initialState: stateType = {
  items: [],
  status: 'loading'
};

const getIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchIngredients.pending, (state: stateType) => {
      state.status = 'loading';
    });
    builder.addCase(
      fetchIngredients.fulfilled,
      (state: stateType, action: PayloadAction<{ data: Ingredient[]; success: boolean }>) => {
        state.items = [...action.payload.data];
        state.items = state.items.map(e => ({ ...e, count: e?.count ? e.count : 0 }));
        state.status = 'success';
      }
    );
    builder.addCase(fetchIngredients.rejected, (state: stateType, error) => {
      state.status = 'error';
      state.items = [];
      console.log('Error:', error);
    });
  }
});

export default getIngredientsSlice.reducer;

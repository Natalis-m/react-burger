import { createSlice } from '@reduxjs/toolkit';

const initialState = { id: '' };

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    changeDetailsIngredient(state, action) {
      state.id = action.payload;
    }
  }
});

export const { changeDetailsIngredient } = currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;

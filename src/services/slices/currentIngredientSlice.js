import { createSlice } from '@reduxjs/toolkit';

const initialState = { details: {} };

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    changeDetailsIngredient(state, action) {
      state.details = action.payload;
    }
  }
});

export const { changeDetailsIngredient } = currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;

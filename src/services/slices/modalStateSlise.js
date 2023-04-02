import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  opened: false,
  modalIngredient: false,
  modalOrder: false
};

const modalStateSlise = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setStateModal(state, action) {
      state.opened = action.payload;
    },
    addModalIngredient(state, action) {
      state.modalIngredient = action.payload;
    },
    addModalOrder(state, action) {
      state.modalOrder = action.payload;
    }
  }
});

export const { setStateModal, addModalIngredient, addModalOrder } = modalStateSlise.actions;
export default modalStateSlise.reducer;

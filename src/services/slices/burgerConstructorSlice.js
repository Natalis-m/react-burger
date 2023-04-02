import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bun: {
    name: 'добавьте булку',
    price: 0,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png'
  },
  filling: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addFilling(state, actions) {
      state.filling = [...state.filling, actions.payload];
    },
    deletIngredient(state, actions) {
      state.filling = actions.payload;
    },
    setBun(state, actions) {
      state.bun = actions.payload;
    },
    setFilling(state, actions) {
      state.filling[actions.payload.to] = state.filling.splice(
        actions.payload.from,
        1,
        state.filling[actions.payload.to]
      )[0];
    }
  }
});

export const { addFilling, setBun, deletIngredient, setFilling } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;

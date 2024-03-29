import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Ingredient } from '../../model/ingredient.model';

const initialState = {
  bun: {
    name: 'добавьте булку',
    price: 0,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    _id: ''
  },
  filling: [] as Ingredient[]
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addFilling(state, actions) {
      state.filling = [...state.filling, actions.payload];
      state.filling = state.filling.map(e => ({ ...e, id: uuidv4() }));
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
    },
    clearConstructor(state) {
      state.filling = [];
      state.bun = initialState.bun;
    }
  }
});

export const { addFilling, setBun, deletIngredient, setFilling, clearConstructor } =
  burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;

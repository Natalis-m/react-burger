import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createdOrderReducer from './slices/createdOrderSlice';
import currentIngredientReducer from './slices/currentIngredientSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import getIngredientsReducer from './slices/getIngredientsSlice';

export const store = configureStore({
  reducer: {
    getIngredientsReducer,
    burgerConstructorReducer,
    createdOrderReducer,
    currentIngredientReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

import { configureStore } from '@reduxjs/toolkit';
import createdOrderReducer from './slices/createdOrderSlise';
import currentIngredientReducer from './slices/currentIngredientSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import getIngredientsReducer from './slices/getIngredientsSlice';
import modalStateReduser from './slices/modalStateSlise';

export const store = configureStore({
  reducer: {
    getIngredientsReducer,
    // +Получение списка ингредиентов от API. Используется в компоненте BurgerIngredients
    burgerConstructorReducer,
    // +Получение списка ингредиентов для конструктора бургера. Используется в компоненте BurgerConstructor
    createdOrderReducer,
    // Получение и обновление номера заказа в компоненте OrderDetails
    currentIngredientReducer,
    // +Добавление данных о просматриваемом ингредиенте в компоненте IngredientDetails
    modalStateReduser
    // +Удаление данных о просматриваемом в модальном окне ингредиенте при закрытии модального окна.
  }
});

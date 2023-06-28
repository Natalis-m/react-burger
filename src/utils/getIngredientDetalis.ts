import { Ingredient } from '../model/ingredient.model';

export const getIngredientDetalis = (ingredientsId: string[], allIngredients: Ingredient[]) => {
  let currentIngredient: Ingredient;
  let orderIngredients: Ingredient[] = [];

  //посчитали повторы id
  const ingredientСounter = ingredientsId.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;

    return acc;
  }, {} as { [key: string]: number });

  //создали обьект типа id/количество
  let ingredientsObject = Object.keys(ingredientСounter).map(function (id) {
    return { _id: id, sum: ingredientСounter[id] };
  });

  ingredientsObject.forEach(ingredient => {
    allIngredients.forEach((item: Ingredient) => {
      if (item._id === ingredient._id) {
        currentIngredient = { ...item };
        currentIngredient.count = ingredient.sum;
        return orderIngredients.push(currentIngredient);
      } else {
        return;
      }
    });
  });

  let orderSum = orderIngredients.reduce((sum, currentItem) => {
    return sum + currentItem.price * (currentItem?.count ?? 1);
  }, 0);

  return { orderIngredients, orderSum };
};

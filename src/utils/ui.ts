import { IngredientType } from '../model/ingredient.model';

const title = ['Булки', 'Соусы', 'Начинки'];
const idIngredient: IngredientType[] = ['bun', 'sauce', 'main'];
export const arrData = title.map((n, i) => ({
  title: n,
  type: idIngredient[i % idIngredient.length]
}));

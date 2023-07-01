export interface Ingredient {
  calories?: number;
  carbohydrates?: number;
  count?: number;
  fat?: number;
  image: string;
  image_large?: string;
  image_mobile?: string;
  name: string;
  price: number;
  proteins?: number;
  type?: IngredientType;
  __v?: number;
  _id: string;
  id?: string;
}

export type IngredientType = 'bun' | 'main' | 'sauce';

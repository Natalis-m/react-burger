import currentIngredientReduser, {
  initialState,
  changeDetailsIngredient
} from '../slices/currentIngredientSlice';

describe('Определяем просматриваемый ингредиент', () => {
  it('Передаем не действующий екшен', () => {
    expect(currentIngredientReduser(undefined, { type: '' })).toEqual(initialState);
  });
  it('Id записался', () => {
    const res = currentIngredientReduser(initialState, {
      type: changeDetailsIngredient.type,
      payload: { id: 123 }
    });

    expect(res.id).toEqual({ id: 123 });
  });
});

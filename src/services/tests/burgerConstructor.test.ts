import { Ingredient } from '../../model/ingredient.model';
import burgerConstructorReducer, {
  initialState,
  addFilling,
  setBun,
  deleteIngredient,
  setFilling,
  clearConstructor
} from '../slices/burgerConstructorSlice';

const bun = {
  image: 'https.png',
  name: 'Краторная булка',
  price: 1255,
  _id: '643'
};

const fillingIngredient: Ingredient = {
  image: 'https.png',
  price: 3000,
  name: 'Говяжий метеорит',
  _id: '601'
};

const filling: Ingredient[] = [
  {
    image: 'https.png',
    name: 'Филе',
    price: 988,
    _id: '60d'
  },
  {
    image: 'https.png',
    name: 'Соус фирменный',
    price: 80,
    _id: '643'
  },
  {
    image: 'https.png',
    price: 3000,
    name: 'Говяжий метеорит',
    _id: '601'
  }
];

const resFilling: Ingredient[] = [
  {
    image: 'https.png',
    name: 'Филе',
    price: 988,
    _id: '60d'
  },
  {
    image: 'https.png',
    name: 'Соус фирменный',
    price: 80,
    _id: '643'
  }
];

describe('Тестируем добавление ингредиентов в конструктор', () => {
  it('Передаем не действующий екшен', () => {
    expect(burgerConstructorReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('Добавляем/меняем булку', () => {
    const res = burgerConstructorReducer(initialState, { type: setBun.type, payload: bun });
    expect(res.bun).toEqual(bun);
  });

  it('Добавляем начинку', () => {
    const res = burgerConstructorReducer(initialState, {
      type: addFilling.type,
      payload: { ...fillingIngredient, id: 'testId' }
    });

    expect(res.filling).toEqual([...initialState.filling, { ...fillingIngredient, id: 'testId' }]);
  });

  it('Удалить ингредиент', () => {
    const res = burgerConstructorReducer(
      { bun, filling },
      { type: deleteIngredient.type, payload: [...resFilling] }
    );
    expect(res.filling).toEqual([...resFilling]);
  });

  it('Поменять местами ингредиенты', () => {
    const from = 2;
    const to = 1;
    const res = burgerConstructorReducer(
      { bun, filling },
      { type: setFilling.type, payload: { from, to } }
    );
    const expected = [...filling];
    expected[to] = expected.splice(from, 1, expected[to])[0];

    expect(res.filling).toEqual([...expected]);
  });

  it('Очистить конструктор бургера', () => {
    const res = burgerConstructorReducer({ bun, filling }, { type: clearConstructor.type });

    expect(res).toEqual(initialState);
  });
});

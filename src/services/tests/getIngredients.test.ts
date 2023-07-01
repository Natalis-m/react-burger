jest.mock('axios');
import axios from 'axios';
import getIngredientsReducer, {
  initialState,
  fetchIngredients
} from '../slices/getIngredientsSlice';

const mockAxios = axios as jest.Mocked<typeof axios>;

const data = [
  {
    image: 'https.png',
    name: 'Краторная булка',
    price: 1255,
    _id: '643'
  },
  {
    image: 'https.png',
    name: 'Филе',
    price: 988,
    _id: '60d'
  }
];

describe('Получить все ингредиенты', () => {
  beforeEach(() => {
    mockAxios.get.mockResolvedValue(Promise.resolve(data));
  });

  it('Успешно', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: { data: [...data], success: true }
    };
    const res = getIngredientsReducer(initialState, action);
    const expected = {
      items: data.map(e => ({ ...e, count: 0 })),
      status: 'success'
    };

    expect(res).toEqual(expected);
  });
});

jest.mock('axios');
import axios from 'axios';
import createdOrderReducer, { initialState, sendBurger } from '../slices/createdOrderSlice';

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Создание заказа', () => {
  const data = {
    name: 'Space антарианский краторный бургер',
    order: {
      number: 7771
    },
    success: true
  };

  beforeEach(() => {
    mockAxios.post.mockResolvedValue(Promise.resolve(data));
  });

  it('Успешное создание заказа', () => {
    const action = { type: sendBurger.fulfilled.type, payload: { ...data } };
    const res = createdOrderReducer(initialState, action);

    expect(res).toEqual({ ...data });
  });
});

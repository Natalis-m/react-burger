import ordersReducer, { initialState } from '../slices/ordersReducer';
import { wsMessageAll, wsMessageMy } from '../slices/ordersActions';

const defoltOrders = [
  {
    createdAt: '2023-06-29T08:10:04.785Z',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0943'
    ],
    name: 'Space антарианский флюоресцентный бургер',
    number: 10309,
    status: 'done',
    updatedAt: '2023-06-29T08:10:04.886Z',
    _id: '649d3c5c8a4b62001c861ab2'
  },

  {
    createdAt: '2023-06-29T07:56:05.996Z',
    ingredients: ['643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa093d'],
    name: 'Space флюоресцентный бургер',
    number: 10308,
    status: 'done',
    updatedAt: '2023-06-29T07:56:06.107Z',
    _id: '649d39158a4b62001c861a8e'
  }
];

describe('WS обработка', () => {
  it('Передаем не действующий екшен', () => {
    expect(ordersReducer(undefined, { type: '' })).toEqual(initialState);
  });
  it('Записали в стейт список заказов', () => {
    const res = ordersReducer(initialState, { type: wsMessageAll.type, payload: defoltOrders });

    expect(res.allOrders.orders).toEqual(initialState.allOrders.orders);
  });
  it('Записали в стейт историю заказов', () => {
    const res = ordersReducer(initialState, { type: wsMessageMy.type, payload: defoltOrders });

    expect(res.myOrders.orders).toEqual(initialState.myOrders.orders);
  });
});

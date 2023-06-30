import userReducer, {
  initialState,
  registerUser,
  loginUser,
  getUser,
  updateToken,
  logout
} from '../slices/userSlice';

jest.mock('axios');
import axios from 'axios';

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Работа с пользователем', () => {
  const data = {
    success: true,
    user: {
      email: 'n.m@yandex.ru',
      name: 'Natalya'
    },
    accessToken: ''
  };

  beforeEach(() => {
    mockAxios.post.mockResolvedValue(Promise.resolve(data));
  });

  it('Регистрация позьзователя', () => {
    const action = { type: registerUser.fulfilled.type, payload: { ...data } };
    const res = userReducer(initialState, action);

    expect(res.user).toEqual(data.user);
  });

  it('Логин', () => {
    const action = { type: loginUser.fulfilled.type, payload: { ...data } };
    const res = userReducer(initialState, action);

    expect(res.user).toEqual(data.user);
  });
  it('Обновить данные пользователя', () => {
    const action = { type: getUser.fulfilled.type, payload: { ...data } };
    const res = userReducer(initialState, action);

    expect(res.user).toEqual(data.user);
  });
  it('Обновить токен', () => {
    const action = { type: updateToken.fulfilled.type, payload: { ...data } };
    const res = userReducer(initialState, action);

    expect(res.accessToken).toEqual(data.accessToken);
  });
  it('Выход из аккаунта', () => {
    const action = { type: logout.fulfilled.type, payload: initialState };
    const res = userReducer(initialState, action);

    expect(res).toEqual(initialState);
  });
});

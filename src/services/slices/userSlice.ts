import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/api';
import axios from 'axios';

const getAccessTokenEndDate = () => {
  const timestemp = new Date().getTime() + 20 * 60 * 1000;

  return new Date(timestemp);
};

const writeUserData = (state: typeof defaultState, action: PayloadAction<typeof defaultState>) => {
  const accessTokenEndDate = getAccessTokenEndDate().toString();

  state.user = action.payload.user;
  state.accessToken = action.payload.accessToken;

  localStorage.setItem('accessTokenEndDate', accessTokenEndDate);
  localStorage.setItem('refreshToken', action.payload.refreshToken);
};

export const registerUser = createAsyncThunk(
  'registerUser/user',
  async (user: { email: string; password: string; name: string }) => {
    return await axios
      .post(`${BASE_URL}/auth/register`, {
        email: user.email,
        password: user.password,
        name: user.name
      })
      .then(({ data }) => {
        return data;
      })
      .catch(res => {
        res.response.data.message == 'User already exists'
          ? alert('Такой пользователь уже существует')
          : alert('Что-то пошло не так, повторите попытку позже');
      });
  }
);

export const loginUser = createAsyncThunk(
  'loginUser/user',
  async (user: { email: string; password: string }) => {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, {
      email: user.email,
      password: user.password
    });
    return data;
  }
);

export const getUser = createAsyncThunk('getUser/user', async (token: string) => {
  const { data } = await axios.get(`${BASE_URL}/auth/user`, {
    headers: {
      Authorization: token
    }
  });

  return data;
});

export const updateToken = createAsyncThunk('updateToken/user', async (_, { dispatch }) => {
  const { data } = await axios.post(`${BASE_URL}/auth/token`, {
    token: localStorage.getItem('refreshToken')
  });
  dispatch(getUser(data.accessToken));

  return data;
});

export const updateUser = createAsyncThunk(
  'updateUser/user',
  async (values: { name: string; email: string; password: string }) => {
    const { data } = await axios.patch(`${BASE_URL}/auth/user`, {
      headers: {
        Authorization: {
          name: values.name,
          email: values.email,
          password: values.password
        }
      }
    });

    return data;
  }
);

export const logout = createAsyncThunk('logout/user', async () => {
  await axios
    .post(`${BASE_URL}/auth/logout`, {
      token: localStorage.getItem('refreshToken')
    })
    .then(() => {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessTokenEndDate');
    });
});

export const forgotPassword = createAsyncThunk(
  'forgotPassword/user',
  async (value: { email: string }) => {
    await axios
      .post(`${BASE_URL}/password-reset`, {
        email: value.email
      })
      .then(res => console.log('письмо отправлено', res));
  }
);

export const resetPassword = createAsyncThunk(
  'resetPassword/user',
  async (values: { password: string; token: string }) => {
    await axios.post(`${BASE_URL}/password-reset/reset`, {
      password: values.password,
      token: values.token
    });
  }
);

const defaultState = {
  user: {
    name: '',
    email: ''
  },
  accessToken: '',
  refreshToken: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      writeUserData(state, action);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      writeUserData(state, action);
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user.email = action.payload.user.email;
      state.user.name = action.payload.user.name;
    });
    builder.addCase(updateToken.fulfilled, (state, action) => {
      const accessTokenEndDate = getAccessTokenEndDate();
      state.accessToken = action.payload.accessToken;
      localStorage.setItem('accessTokenEndDate', accessTokenEndDate.toString());
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    });
    builder.addCase(logout.fulfilled, state => {
      state.user = { name: '', email: '' };
      state.accessToken = '';
    });
  }
});

export default userSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/api';
// import { writeUserData } from '../setUser/ui';
import axios from 'axios';

const writeUserData = (state, action) => {
  const timestemp = new Date().getTime() + 20 * 60 * 1000;
  const tokenEndDate = new Date(timestemp);

  state.user = action.payload.user;
  state.isAuthenticated = true;
  state.token = action.payload.accessToken;

  localStorage.setItem('tokenEndDate', tokenEndDate);
  localStorage.setItem('token', action.payload.refreshToken);
};

export const registerUser = createAsyncThunk('registerUser/user', async user => {
  // const { data } =
  await axios
    .post(`${BASE_URL}/auth/register`, {
      email: user.email,
      password: user.password,
      name: user.name
    })
    // return data;
    .then(({ data }) => {
      return data;
      // writeUserData(data);
    })
    .catch(res => {
      res.response.data.message == 'User already exists'
        ? alert('Такой пользователь уже существует')
        : alert('Что-то пошло не так, повторите попытку позже');
    });
});

export const loginUser = createAsyncThunk('loginUser/user', async user => {
  // try {
  const { data } = await axios.post(`${BASE_URL}/auth/login`, {
    email: user.email,
    password: user.password
  });
  // writeUserData(data);
  // } catch (err) {
  //   alert('Ошибка, проверьте введенные данные');
  //   console.log('Error:', err);
  // }
  return data;
});

export const getUser = createAsyncThunk('getUser/user', async token => {
  const { data } = await axios.get(`${BASE_URL}/auth/user`, {
    headers: {
      Authorization: token
    }
  });
  return data;
  // localStorage.setItem('user', JSON.stringify(data.user));
});

export const updateToken = createAsyncThunk('updateToken/user', async (_, { dispatch }) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/token`, {
      token: localStorage.getItem('token')
    });
    dispatch(getUser(data.accessToken));
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const logout = createAsyncThunk('logout/user', async () => {
  await axios
    .post(`${BASE_URL}/auth/logout`, {
      token: localStorage.getItem('token')
    })
    .then(
      // localStorage.removeItem('user'),
      localStorage.removeItem('token'),
      // localStorage.removeItem('refreshToken'),
      localStorage.removeItem('tokenEndDate')
    );
});

export const forgotPassword = createAsyncThunk('forgotPassword/user', async email => {
  await axios.post(`${BASE_URL}/password-reset`, {
    email: email
  });
});

export const resetPassword = createAsyncThunk('resetPassword/user', async ({ password, token }) => {
  await axios.post(`${BASE_URL}/password-reset/reset`, {
    password: password,
    token: token
  });
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    user: {
      name: '',
      email: ''
    },
    token: ''
  },
  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      writeUserData(state, action);
    },
    [loginUser.fulfilled]: (state, action) => {
      writeUserData(state, action);
    },
    [getUser.fulfilled]: (state, action) => {
      state.user.email = action.payload.user.email;
      state.user.name = action.payload.user.name;
      // console.log('Пользователь получен', state);
    },
    [updateToken.fulfilled]: (state, action) => {
      const timestemp = new Date().getTime() + 20 * 60 * 1000;
      const tokenEndDate = new Date(timestemp);

      state.isAuthenticated = true;
      state.token = action.payload.accessToken;
      localStorage.setItem('tokenEndDate', tokenEndDate);
      localStorage.setItem('token', action.payload.refreshToken);
    },
    [logout.fulfilled]: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  }
});

export default userSlice.reducer;

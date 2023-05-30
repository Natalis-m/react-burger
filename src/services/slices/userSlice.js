// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { BASE_URL } from '../../utils/api';
// import axios from 'axios';

// const initialState = {
//   isAuthenticated: false,
//   user: {
//     email: '',
//     name: ''
//   }
// };

// const auth = (state, action) => {
//   const timestemp = new Date().getTime() + 20 * 60 * 1000;
//   const tokenEndDate = new Date(timestemp);
//   console.log('TEST', tokenEndDate);
//   // const token = { token: action.payload.accessToken, tokenEndDate: tokenEndDate };
//   localStorage.setItem('token', JSON.stringify(action.payload.accessToken));
//   localStorage.setItem('tokenEndDate', tokenEndDate);
//   localStorage.setItem('refreshToken', action.payload.refreshToken);
//   localStorage.setItem('user', JSON.stringify(action.payload.user));

//   state.user.email = action.payload.user.email;
//   state.user.name = action.payload.user.name;
//   state.isAuthenticated = true;

//   const time = new Date().getTime();
//   console.log(time);
// };

// export const registerUser = createAsyncThunk('registerUser/user', async user => {
//   await axios
//     .post(`${BASE_URL}/auth/register`, {
//       email: user.email,
//       password: user.password,
//       name: user.name
//     })
//     .then(({ data }) => {
//       return data;
//     })
//     .catch(res => {
//       res.response.data.message == 'User already exists'
//         ? alert('Такой пользователь уже существует')
//         : alert('Что-то пошло не так, повторите попытку позже');
//     });
// });

// export const loginUser = createAsyncThunk('loginUser/user', async user => {
//   const { data } = await axios.post(`${BASE_URL}/auth/login`, {
//     email: user.email,
//     password: user.password
//   });
//   return data;
// });

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     saveUserOnRender(state) {
//       state.isAuthenticated = true;
//       state.user = JSON.parse(localStorage.getItem('user'));
//     }
//   },
//   extraReducers: {
//     [registerUser.fulfilled]: (state, action) => {
//       auth(state, action);
//     },
//     [loginUser.fulfilled]: (state, action) => {
//       auth(state, action);
//     },
//     [loginUser.rejected]: (error, state) => {
//       alert('Ошибка, проверьте введенные данные');
//       console.log('Error:', error);
//       console.log('?', state.user);
//     }
//   }
// });

// export const { saveUserOnRender } = userSlice.actions;
// export default userSlice.reducer;

// export const forgotPassword = createAsyncThunk('forgotPassword/user', async email => {
//   const request = await axios.post(`${BASE_URL}/password-reset`, {
//     email: email
//   });
// });

// export const resetPassword = createAsyncThunk('resetPassword/user', async user => {
//   const request = await axios.post(`${BASE_URL}/password-reset/reset`, {
//     password: '',
//     token: ''
//   });
// });

// // если не прошло 20 минут, то используем эту ф-цию для получения данных о пользователе,
// // иначе обновить токен
// export const updateUser = createAsyncThunk('updateUser/user', async () => {
//   const res = await axios.get(`${BASE_URL}/auth/user`, {
//     authorization: localStorage.getItem('token')
//   });
//   console.log('res', localStorage.getItem('token'));
//   // return data;
// });

// export const logout = createAsyncThunk('logout/user', async () => {
//   await axios
//     .post(`${BASE_URL}/auth/logout`, {
//       token: localStorage.getItem('refreshToken')
//     })
//     .then(
//       localStorage.removeItem('user'),
//       localStorage.removeItem('token'),
//       localStorage.removeItem('refreshToken')
//     );

//   // return data;
// });

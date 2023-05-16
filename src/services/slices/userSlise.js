import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/api';
import axios from 'axios';

const initialState = {
  success: false,
  user: {
    email: '',
    name: ''
  },
  accessToken: 'Bearer ...',
  refreshToken: ''
};

export const registerUser = createAsyncThunk('registerUser/user', async register => {
  const auth = await axios.post(`${BASE_URL}/auth/register`, {
    email: '',
    password: '',
    name: ''
  });
  return auth;
});

export const loginUser = createAsyncThunk('loginUser/user', async login => {
  const auth = await axios.post(`${BASE_URL}/auth/login`, {
    email: '',
    password: ''
  });
  return auth;
});

const UserSlise = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    // [sendBurger.pending]: state => {
    //   state = [];
    // },
    // [sendBurger.fulfilled]: (state, action) => {
    //   return { ...action.payload };
    // },
    // [sendBurger.rejected]: (state, error) => {
    //   console.log('Error:', error);
    // }
  }
});

export default UserSlise.reducer;

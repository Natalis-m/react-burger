import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/api';
import axios from 'axios';

const initialState = {
  // success: false,
  user: {
    email: '',
    name: ''
  }
  // accessToken: 'Bearer ...',
  // refreshToken: ''
};

export const registerUser = createAsyncThunk('registerUser/user', async (email, password, name) => {
  const auth = await axios.post(`${BASE_URL}/auth/register`, {
    email: email,
    password: password,
    name: name
  });
  console.log(auth);
  return auth;
});

export const loginUser = createAsyncThunk('loginUser/user', async ({ email, password }) => {
  const auth = await axios.post(`${BASE_URL}/auth/login`, {
    email: email,
    password: password
  });
  return auth;
});

const UserSlise = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [loginUser.pending]: state => {
      state = initialState;
    },
    [loginUser.fulfilled]: action => {
      console.log(action.payload);
      return { ...action.payload };
    },
    [loginUser.rejected]: (state, error) => {
      console.log('Error:', error);
    },
    [registerUser.pending]: state => {
      state = initialState;
    },
    [registerUser.fulfilled]: action => {
      console.log(action.payload);
      // return { ...action.payload };
    },
    [registerUser.rejected]: (state, error) => {
      console.log('Error:', error);
    }
  }
});

export default UserSlise.reducer;

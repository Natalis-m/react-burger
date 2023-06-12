import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/api';

export const getUser = createAsyncThunk('getUser/user', async () => {
  await axios.get(`${BASE_URL}/auth/user`, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem('token'))
    }
  });
});

// {
//   "success": true,
//   "user": {
//     "email": "",
//     "name": ""
//   }
// }

export const updateToken = createAsyncThunk('updateToken/user', async () => {
  await axios
    .post(`${BASE_URL}/auth/token`, {
      token: localStorage.getItem('refreshToken')
    })
    .then(res => {
      console.log('R', res);
    });
});

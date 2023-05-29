// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { BASE_URL } from '../../utils/api';

// export const logout = createAsyncThunk('logout/user', async () => {
//   await axios
//     .post(`${BASE_URL}/auth/logout`, {
//       token: localStorage.getItem('refreshToken')
//     })
//     .then(
//       localStorage.removeItem('user'),
//       localStorage.removeItem('token'),
//       localStorage.removeItem('refreshToken'),
//       localStorage.removeItem('tokenEndDate')
//     );

//   // return data;
// });

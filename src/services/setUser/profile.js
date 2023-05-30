import axios from 'axios';
import { BASE_URL } from '../../utils/api';

export const getUser = async () => {
  const { data } = await axios.get(`${BASE_URL}/auth/user`, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem('token'))
    }
  });
  localStorage.setItem('user', JSON.stringify(data.user));
};

export const updateToken = async () => {
  await axios
    .post(`${BASE_URL}/auth/token`, {
      token: localStorage.getItem('refreshToken')
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const logout = async () => {
  await axios
    .post(`${BASE_URL}/auth/logout`, {
      token: localStorage.getItem('refreshToken')
    })
    .then(
      localStorage.removeItem('user'),
      localStorage.removeItem('token'),
      localStorage.removeItem('refreshToken'),
      localStorage.removeItem('tokenEndDate')
    );
};

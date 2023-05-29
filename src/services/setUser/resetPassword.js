import axios from 'axios';
import { BASE_URL } from '../../utils/api';

export const forgotPassword = async email => {
  await axios.post(`${BASE_URL}/password-reset`, {
    email: email
  });
};

export const resetPassword = async ({ password, token }) => {
  await axios.post(`${BASE_URL}/password-reset/reset`, {
    password: password,
    token: token
  });
};

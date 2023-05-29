import { BASE_URL } from '../../utils/api';
import { writeUserData } from './ui';
import axios from 'axios';

export const registerUser = async user => {
  await axios
    .post(`${BASE_URL}/auth/register`, {
      email: user.email,
      password: user.password,
      name: user.name
    })
    .then(({ data }) => {
      writeUserData(data);
    })
    .catch(res => {
      res.response.data.message == 'User already exists'
        ? alert('Такой пользователь уже существует')
        : alert('Что-то пошло не так, повторите попытку позже');
    });
};

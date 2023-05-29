import { BASE_URL } from '../../utils/api';
import { writeUserData } from './ui';
import axios from 'axios';

export const loginUser = async user => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, {
      email: user.email,
      password: user.password
    });
    writeUserData(data);
  } catch (err) {
    alert('Ошибка, проверьте введенные данные');
    console.log('Error:', err);
  }
};

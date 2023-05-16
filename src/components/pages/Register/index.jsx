// страница регистрации вход со стр входа

import {
  Button,
  Input,
  EmailInput,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../../../services/slices/userSlise';
import Style from './RegisterStyle.module.css';

function Register() {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [eye, setEye] = useState(false);
  const dispatch = useDispatch();
  const update = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const auth = () => {
    dispatch(registerUser(user.email, user.password, user.name));
    console.log(user.email, user.password, user.name);
  };
  return (
    <section className={Style.content}>
      <div className={Style.form}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={update}
          value={user.name}
          name={'name'}
          error={false}
          size={'default'}
          extraClass="ml-1"
        />
        <EmailInput onChange={update} value={user.email} name={'email'} icon={false} />
        <Input
          onChange={update}
          value={user.password}
          name={'password'}
          placeholder="Пароль"
          icon={eye ? 'ShowIcon' : 'HideIcon'}
          extraClass="mb-2"
          type={eye ? 'text' : 'password'}
          onIconClick={() => setEye(!eye)}
        />
        <Button
          onClick={() => auth()}
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="ml-2"
        >
          Зарегистрированться
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Уже зарегистрированы?{' '}
        <Link to="/login" className={Style.link}>
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;

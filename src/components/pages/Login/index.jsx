// страница авторизации, открывается из App
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Style from './LoginStyle.module.css';
import { loginUser } from '../../../services/slices/userSlise';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [eye, setEye] = useState(false);
  const dispatch = useDispatch();
  const update = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const auth = () => {
    dispatch(loginUser(user.email, user.password));
    console.log(user.email, user.password);
  };

  return (
    <section className={Style.content}>
      <div className={Style.form}>
        <h2 className="text text_type_main-medium">Вход</h2>
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
          Войти
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы новый пользователь?{' '}
        <Link to="/register" className={Style.link}>
          Зарегистрированться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{' '}
        <Link to="/forgot-password" className={Style.link}>
          Восстановить пароль
        </Link>
      </p>
    </section>
  );
}

export default Login;

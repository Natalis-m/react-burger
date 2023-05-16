// страница авторизации, открывается из App
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import Style from './LoginStyle.module.css';
import { useState, useRef } from 'react';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  };

  const update = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
    console.log({ user });
  };

  return (
    <section className={Style.content}>
      <div className={Style.form}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <Input
          type={'email'}
          onChange={update}
          value={user.email}
          name={'email'}
          placeholder="E-mail"
          icon={false}
          extraClass="mb-2"
        />
        <Input
          type={'password'}
          onChange={update}
          value={user.password}
          name={'password'}
          placeholder="Пароль"
          icon={'HideIcon'}
          extraClass="mb-2"
          ref={inputRef}
          onIconClick={onIconClick}
        />
        <Button htmlType="button" type="primary" size="medium" onChange="" extraClass="ml-2">
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

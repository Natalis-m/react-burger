import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import Style from './ResetPasswordStyle.module.css';
import { resetPassword } from '../../../services/setUser/resetPassword';
import { Link, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [eye, setEye] = useState(false);
  const [user, setUser] = useState({ token: '', password: '' });
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('user');

  useEffect(() => {
    if (isAuth) {
      setTimeout(navigate('/', { replace: true }), 500);
    }
  }, [isAuth]);

  const update = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className={Style.content}>
      <div className={Style.form}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <Input
          onChange={update}
          value={user.password}
          name={'password'}
          placeholder="Новый пароль"
          icon={eye ? 'ShowIcon' : 'HideIcon'}
          extraClass="mb-2"
          type={eye ? 'text' : 'password'}
          onIconClick={() => setEye(!eye)}
        />
        <Input
          onChange={update}
          value={user.token}
          name={'token'}
          placeholder="Введите код из письма"
          extraClass="mb-2"
        />
        <Button
          onClick={() => {
            resetPassword(user);
            navigate('/login');
          }}
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="ml-2"
        >
          Сохранить
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль?{' '}
        <Link to="/login" className={Style.link}>
          Войти
        </Link>
      </p>
    </section>
  );
}

export default ResetPassword;

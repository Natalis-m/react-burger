import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Style from './ForgotPasswordStyle.module.css';
import { forgotPassword } from '../../../services/setUser/resetPassword';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const isAuth = localStorage.getItem('user');
  useEffect(() => {
    if (isAuth) {
      setTimeout(navigate('/', { replace: true }), 500);
    }
  }, [isAuth]);

  const onClick = () => {
    navigate('/reset-password');
    forgotPassword(email);
  };
  return (
    <section className={Style.content}>
      <div className={Style.form}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <EmailInput
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          name={'email'}
          placeholder="Укажите е-mail"
          isIcon={false}
          extraClass="mb-2"
        />
        <Button onClick={onClick} htmlType="button" type="primary" size="medium" extraClass="ml-2">
          Восстановить
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

export default ForgotPassword;

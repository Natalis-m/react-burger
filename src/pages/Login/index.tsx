import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Style from '../form/formStyle.module.css';
import { loginUser } from '../../services/slices/userSlice';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';

function Login() {
  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });

  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginUser(values));
  };

  const location = useLocation();
  const from = location.state && location.state.from;
  const isUserLoggedIn = useTypedSelector(state => state.userReducer.accessToken);

  useEffect(() => {
    if (from && isUserLoggedIn) {
      navigate(from.pathname);
    }
  }, [isUserLoggedIn, from]);

  return (
    <section className={Style.content}>
      <div className={Style.form}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <form className={Style.formBody} onSubmit={handleSubmit}>
          <EmailInput onChange={handleChange} value={values.email} name={'email'} />
          <Input
            onChange={handleChange}
            value={values.password}
            name={'password'}
            placeholder="Пароль"
            icon={eye ? 'ShowIcon' : 'HideIcon'}
            extraClass="mb-2"
            type={eye ? 'text' : 'password'}
            onIconClick={() => setEye(!eye)}
          />
          <Button htmlType="submit" type="primary" size="medium" extraClass="ml-2">
            Войти
          </Button>
        </form>
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

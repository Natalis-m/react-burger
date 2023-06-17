import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import Style from '../form/formStyle.module.css';
import { resetPassword } from '../../../services/slices/userSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';
import { useDispatch } from 'react-redux';

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = localStorage.getItem('user');
  const dispatch = useDispatch();

  const [eye, setEye] = useState(false);
  const { values, handleChange } = useForm({
    token: '',
    password: ''
  });

  useEffect(() => {
    if (isAuth) {
      setTimeout(navigate('/', { replace: true }), 500);
    }
  }, [isAuth]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(resetPassword(values));
    navigate('/login', { from: location });
  };

  return (
    <section className={Style.content}>
      <div className={Style.form}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <form className={Style.formBody} onSubmit={handleSubmit}>
          <Input
            onChange={handleChange}
            value={values.password}
            name={'password'}
            placeholder="Новый пароль"
            icon={eye ? 'ShowIcon' : 'HideIcon'}
            extraClass="mb-2"
            type={eye ? 'text' : 'password'}
            onIconClick={() => setEye(!eye)}
          />
          <Input
            onChange={handleChange}
            value={values.token}
            name={'token'}
            placeholder="Введите код из письма"
            extraClass="mb-2"
          />
          <Button htmlType="submit" type="primary" size="medium" extraClass="ml-2">
            Сохранить
          </Button>
        </form>
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

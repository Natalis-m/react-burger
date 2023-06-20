import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Style from '../form/formStyle.module.css';
import { forgotPassword } from '../../services/slices/userSlice';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = localStorage.getItem('user');
  const { values, handleChange } = useForm({
    email: ''
  });

  useEffect(() => {
    if (isAuth) {
      setTimeout(navigate('/', { replace: true }), 500);
    }
  }, [isAuth]);

  const handleSubmit = () => {
    navigate('/reset-password', { state: 'forgotPassword' });
    dispatch(forgotPassword(values));
  };

  return (
    <section className={Style.content}>
      <div className={Style.form}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <form className={Style.formBody} onSubmit={handleSubmit}>
          <EmailInput
            value={values.email}
            onChange={handleChange}
            name={'email'}
            placeholder="Укажите е-mail"
            isIcon={false}
            extraClass="mb-2"
          />
          <Button htmlType="submit" type="primary" size="medium" extraClass="ml-2">
            Восстановить
          </Button>
        </form>
      </div>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль?{' '}
        <Link to="/login" className={Style.link} state={{ from: { pathname: '/' } }}>
          Войти
        </Link>
      </p>
    </section>
  );
}

export default ForgotPassword;

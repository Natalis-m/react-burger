import { Button, Input, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Style from '../form/formStyle.module.css';
import { useForm } from '../../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../services/slices/userSlice';

function Register() {
  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: ''
  });

  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = localStorage.getItem('user');

  useEffect(() => {
    if (isAuth) {
      setTimeout(navigate('/', { replace: true }), 500);
    }
  }, [isAuth]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(registerUser(values));
  };

  return (
    <section className={Style.content}>
      <div className={Style.form}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <form className={Style.formBody} onSubmit={handleSubmit}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleChange}
            value={values.name}
            name={'name'}
            error={false}
            size={'default'}
            extraClass="ml-1"
          />
          <EmailInput onChange={handleChange} value={values.email} name={'email'} icon={false} />
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
            Зарегистрированться
          </Button>
        </form>
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

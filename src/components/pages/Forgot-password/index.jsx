// проверка наличия пользователя с экрана Войти
import {
  Button,
  EmailInput,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Style from './ForgotPasswordStyle.module.css';

function ForgotPassword() {
  const [value, setValue] = useState('');
  const onClick = () => {
    console.log({ value });
  };
  return (
    <section className={Style.content}>
      <div className={Style.form}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <EmailInput
          value={value}
          onChange={e => {
            setValue(e.target.value);
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

// страница авторизации, открывается из App
import {
  Button,
  EmailInput,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import Style from './LoginStyle.module.css';

function Login() {
  return (
    <section className={Style.content}>
      <div className={Style.form}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <EmailInput
          onChange=""
          value=""
          name={'email'}
          placeholder="E-mail"
          isIcon={false}
          extraClass="mb-2"
        />
        <PasswordInput onChange="" value="" name={'password'} extraClass="mb-2" />
        <Button htmlType="button" type="primary" size="medium" extraClass="ml-2">
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

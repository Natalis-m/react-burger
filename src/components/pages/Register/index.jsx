// страница регистрации вход со стр входа

import {
  Button,
  Input,
  EmailInput,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import Style from './RegisterStyle.module.css';

function Register() {
  return (
    <section className={Style.content}>
      <div className={Style.form}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input
          type={'text'}
          placeholder={'Имя'}
          // onChange={e => setValue(e.target.value)}
          // value={value}
          // name={'name'}
          error={false}
          // ref={inputRef}
          // onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
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
          Зарегистрированться
        </Button>
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

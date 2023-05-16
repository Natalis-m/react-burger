// восстановление пароля после проверки наличия пользователя
import {
  Button,
  EmailInput,
  PasswordInput,
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';

import Style from './ResetPasswordStyle.module.css';

function ResetPassword() {
  return (
    <section className={Style.content}>
      <div className={Style.form}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <PasswordInput onChange="" value="" name={'password'} extraClass="mb-2" />
        <Input
          // onChange=""
          // value=""
          // name={'email'}
          placeholder="Введите код из письма"
          isIcon={false}
          extraClass="mb-2"
        />
        <Button htmlType="button" type="primary" size="medium" extraClass="ml-2">
          Сохранить
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль? <a className={Style.link}>Войти</a>
      </p>
    </section>
  );
}

export default ResetPassword;

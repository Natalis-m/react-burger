import { NavLink, useParams } from 'react-router-dom';
import { useState, useRef } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Style from './ProfileStyle.module.css';
import { logout } from '../../../services/setUser/profile';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [value, setValue] = useState('...');
  const inputRef = useRef(null);

  console.log('/PROFILE');

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  };

  const styleLink = ({ isActive }) => {
    return isActive
      ? `${Style.li} + ${Style.li_active} +  text text_type_main-medium`
      : `${Style.li} +  text text_type_main-medium text_color_inactive`;
  };

  return (
    <section className={Style.box + ' mt-30'}>
      <div className={Style.navigate_block}>
        <ul className={Style.navigate}>
          <NavLink to="/profile" className={styleLink}>
            Профиль
          </NavLink>
          <NavLink to="/profile/orders" className={styleLink}>
            История заказов
          </NavLink>
          <NavLink
            to="/"
            onClick={() => {
              logout();
            }}
            className={styleLink}
          >
            Выход
          </NavLink>
        </ul>
        <p className={Style.footnote + ' text text_type_main-default text_color_inactive'}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={Style.inputs}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setValue(e.target.value)}
          icon={'EditIcon'}
          value={user.name}
          name={'name'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        <Input
          type={'text'}
          placeholder={'Логин'}
          onChange={e => setValue(e.target.value)}
          icon={'EditIcon'}
          value={user.email}
          name={'email'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        <Input
          type={'text'}
          placeholder={'Пароль'}
          onChange={e => setValue(e.target.value)}
          icon={'EditIcon'}
          value={value}
          name={'password'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
      </div>
    </section>
  );
}

export default Profile;

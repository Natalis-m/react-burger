import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Style from './ProfileStyle.module.css';
import { logout, updateUser } from '../../services/slices/userSlice';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../hooks/useTyped';

function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const styleLink = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? `${Style.li} + ${Style.li_active} +  text text_type_main-medium`
      : `${Style.li} +  text text_type_main-medium text_color_inactive`;
  };

  const { values, handleChange, setValues } = useForm({
    name: '',
    email: '',
    password: '...'
  });

  const [dataChanged, setDataChanged] = useState(false);

  const state = useAppSelector(state => state.userReducer);

  useEffect(() => {
    setValues({
      name: state.user.name,
      email: state.user.email,
      password: '...'
    });
  }, [state.user]);

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUser(values));
  };

  const handleCancelChanges = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    setValues({
      ...values,
      name: state.user.name,
      email: state.user.email,
      password: ''
    });
    setDataChanged(false);
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
          <NavLink to="/" onClick={handleLogoutClick} className={styleLink}>
            Выход
          </NavLink>
        </ul>
        <p className={Style.footnote + ' text text_type_main-default text_color_inactive'}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={Style.inputs}>
        <form className={Style.formBody} onSubmit={handleSubmit}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => {
              setDataChanged(true);
              handleChange(e);
            }}
            icon={'EditIcon'}
            value={values?.name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
          <Input
            type={'text'}
            placeholder={'Логин'}
            onChange={e => {
              setDataChanged(true);
              handleChange(e);
            }}
            icon={'EditIcon'}
            value={values?.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
          <Input
            type={'text'}
            placeholder={'Пароль'}
            onChange={e => {
              setDataChanged(true);
              handleChange(e);
            }}
            icon={'EditIcon'}
            value={values.password ?? ''}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
          {dataChanged && (
            <div className={Style.profileBtn}>
              <Button htmlType="button" type="primary" onClick={handleCancelChanges}>
                Отмена
              </Button>
              <Button htmlType="submit" type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default Profile;

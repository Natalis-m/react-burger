import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Style from './ProfileStyle.module.css';
// import { logout } from '../../../services/setUser/profile';
import { logout } from '../../../services/slices/userSlice';
import { useForm } from '../../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../services/slices/userSlice';

function Profile() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Изменяем поле');
  };

  const styleLink = ({ isActive }) => {
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

  let state = useSelector(state => state.userReducer);

  // useEffect(() => {
  //   dispatch(getUser(state.token));
  // }, []);

  useEffect(() => {
    setValues({
      name: state.user.name,
      email: state.user.email
    });
  }, [state]);

  const handleLogoutClick = e => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  };

  // const handleSubmit = e => {
  //   e.preventDefault();
  // };

  const handleCancelChanges = e => {
    e.preventDefault();
    // setValues({
    //   ...values,
    //   name: userName,
    //   email: userLogin,
    //   password: ''
    // });
    // setDataChanged(false);
  };

  // if (state.user) {
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
        <form
          className={Style.formBody}
          // onSubmit={handleSubmit}
        >
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => {
              setDataChanged(true);
              handleChange(e);
            }}
            icon={'EditIcon'}
            value={values.name}
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
            onChange={e => {
              setDataChanged(true);
              handleChange(e);
            }}
            icon={'EditIcon'}
            value={values.email}
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
            onChange={e => {
              setDataChanged(true);
              handleChange(e);
            }}
            icon={'EditIcon'}
            value={values.password}
            name={'password'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
          {/* {dataChanged && (
            <div className={Style.profileBtn}>
              <Button type="primary" onClick={handleCancelChanges}>
                Отмена
              </Button>
              <Button htmlType="submit" type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          )} */}
        </form>
      </div>
    </section>
  );
}
// }

export default Profile;

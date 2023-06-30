import React, { useEffect } from 'react';
import styles from './orders.module.css';
import { logout } from '../../services/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useTyped';
import OrdersFeedItem from '../../components/orders-feed-item/orders-feed-item';
import { NavLink } from 'react-router-dom';
import { connectMy, disconnectMy } from '../../services/slices/ordersActions';
import { WS_MY_ORDERS_URL } from '../../utils/api';
import { OrderType } from '../../services/slices/ordersReducer';

export function Orders() {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector(state => state.userReducer);
  useEffect(() => {
    if (accessToken) {
      dispatch(connectMy(`${WS_MY_ORDERS_URL}?token=${accessToken.replace('Bearer ', '')}`));
    }

    return () => {
      dispatch(disconnectMy());
    };
  }, []);

  const { orders } = useAppSelector(state => state.ordersReducer.myOrders);

  const handleLogoutClick = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(logout());
  };

  const styleLink = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? `${styles.li} + ${styles.li_active} +  text text_type_main-medium`
      : `${styles.li} +  text text_type_main-medium text_color_inactive`;
  };

  return (
    <section className={styles.box}>
      <div className={styles.navigate_block}>
        <ul className={styles.navigate}>
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
        <p className={styles.footnote + ' text text_type_main-default text_color_inactive'}>
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </div>
      <div className={styles.profileOrdersSection}>
        <div className={`${styles.profileOrdersContainer} pr-2 custom-scroll pr-1`}>
          {orders.map((order: OrderType) => (
            <OrdersFeedItem
              key={order._id}
              createdAt={order.createdAt}
              ingredients={order.ingredients}
              name={order.name}
              number={order.number}
              status={order.status}
              updatedAt={order.updatedAt}
              _id={order._id}
              displayStatus={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

//              key="649bf13a8a4b62001c8612e9"
//             createdAt="2023-06-28T08:37:14.758Z"
//             ingredients={['643d69a5c3f7b9001cfa0945', '643d69a5c3f7b9001cfa0943']}
//             name="Space антарианский бургер"
//             number={10164}
//             status="done"
//             updatedAt="2023-06-28T08:37:14.928Z"
//             _id="649bf13a8a4b62001c8612e9"
//             displayStatus={false}

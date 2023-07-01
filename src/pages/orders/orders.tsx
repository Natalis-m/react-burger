import React, { useEffect, useState } from 'react';
import styles from './orders.module.css';
import { logout } from '../../services/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useTyped';
import OrdersFeedItem from '../../components/orders-feed-item/orders-feed-item';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { connectMy, disconnectMy } from '../../services/slices/ordersActions';
import { WS_MY_ORDERS_URL } from '../../utils/api';
import { OrderType } from '../../services/slices/ordersReducer';
import { ModalState } from '../../model/modal-sate.model';
import Modal from '../../components/Modal/Modal';
import OrderInfo from '../../components/orders-info/order-info';

export function Orders() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { number } = useParams<{ number: string }>();
  const { accessToken } = useAppSelector(state => state.userReducer);
  const { orders } = useAppSelector(state => state.ordersReducer.myOrders);
  const myOrderNumber = location.state && location.state.myOrderNumber;
  const [openModal, setOpenModal] = useState<ModalState>({
    modalMyCurrent: false
  });

  useEffect(() => {
    console.log('USE EFFECT');
    console.log('myOrderNumber', myOrderNumber);
    console.log('number', number);

    if (myOrderNumber && number) {
      console.log('number', number);
      setOpenModal({ modalMyCurrent: true });
    }
  }, [myOrderNumber, number]);

  useEffect(() => {
    if (accessToken) {
      dispatch(connectMy(`${WS_MY_ORDERS_URL}?token=${accessToken.replace('Bearer ', '')}`));
    }

    return () => {
      dispatch(disconnectMy());
    };
  }, []);

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
              nav="profile/orders"
            />
          ))}
        </div>
      </div>
      {openModal.modalMyCurrent && number && (
        <Modal
          onClose={() => {
            setOpenModal({ modalMyCurrent: false });
            navigate(-1);
          }}
        >
          <OrderInfo number={number} orders={orders} />
        </Modal>
      )}
    </section>
  );
}

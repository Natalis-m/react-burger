import { useParams } from 'react-router';
import OrderInfo from '../../components/orders-info/order-info';
import NotFound from '../NotFound';
import { useAppDispatch, useAppSelector } from '../../hooks/useTyped';
import { useEffect } from 'react';
import { connectMy, disconnectMy } from '../../services/slices/ordersActions';
import { WS_MY_ORDERS_URL } from '../../utils/api';
import style from './PagesOrderInfo.module.css';

function PagesMyOrder() {
  const { status, orders } = useAppSelector(state => state.ordersReducer.myOrders);

  const { accessToken } = useAppSelector(state => state.userReducer);
  const { number } = useParams<{ number: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'disconnect') {
      dispatch(connectMy(`${WS_MY_ORDERS_URL}?token=${accessToken.replace('Bearer ', '')}`));

      return () => {
        dispatch(disconnectMy());
      };
    }
  }, []);

  if (number) {
    return (
      <section className={style.body}>
        <OrderInfo number={number} orders={orders} />
      </section>
    );
  } else {
    return <NotFound />;
  }
}

export default PagesMyOrder;

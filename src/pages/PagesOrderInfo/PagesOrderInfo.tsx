import { useParams } from 'react-router';
import OrderInfo from '../../components/orders-info/order-info';
import NotFound from '../NotFound';
import { useAppDispatch, useAppSelector } from '../../hooks/useTyped';
import { useEffect } from 'react';
import { connectAll, disconnectAll } from '../../services/slices/ordersActions';
import { WS_ORDERS_URL } from '../../utils/api';
import style from './PagesOrderInfo.module.css';

function PagesOrderInfo() {
  const { status, orders } = useAppSelector(state => state.ordersReducer.allOrders);
  const { number } = useParams<{ number: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'disconnect') {
      dispatch(connectAll(WS_ORDERS_URL));

      return () => {
        dispatch(disconnectAll());
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

export default PagesOrderInfo;

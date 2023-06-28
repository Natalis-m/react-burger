import styles from './orders-feed.module.css';
import OrdersFeedItem from '../orders-feed-item/orders-feed-item';
import { useEffect } from 'react';
import { WS_ORDERS_URL } from '../../utils/api';
import { useAppDispatch, useAppSelector } from '../../hooks/useTyped';
import { connectAll } from '../../services/slices/ordersActions';
import { OrderType } from '../../services/slices/ordersReducer';

function OrdersFeed() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector(state => state.ordersReducer.allOrders);

  useEffect(() => {
    dispatch(connectAll(WS_ORDERS_URL));
  }, []);

  return (
    <div className={`${styles.container} pr-2 custom-scroll pr-1`}>
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
  );
}

export default OrdersFeed;

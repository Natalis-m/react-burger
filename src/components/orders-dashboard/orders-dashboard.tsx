import { useAppSelector } from '../../hooks/useTyped';
import { OrderType } from '../../services/slices/ordersReducer';
import styles from './orders-dashboard.module.css';

function OrdersDashboard() {
  const { orders, totalOrders, totalOrdersToday } = useAppSelector(
    state => state.ordersReducer.allOrders
  );

  const ordersReady: OrderType[] = orders
    .filter((order: OrderType) => order.status === 'done')
    .slice(0, 10);
  const ordersInProgress: OrderType[] = orders
    .filter((order: OrderType) => order.status === 'pending')
    .slice(0, 10);

  return (
    <div className={styles.container}>
      <div className={`${styles.statuses} text text_type_digits-default mb-15`}>
        <ul className={styles.ul}>
          <li className="text text_type_main-medium pb-6">Готовы:</li>
          {ordersReady.map(item => (
            <li key={item._id} className={`${styles.li} ${styles.ready}`}>
              {item.number}
            </li>
          ))}
        </ul>
        <ul className={styles.ul}>
          <li className="text text_type_main-medium pb-6">В работе:</li>
          {ordersInProgress.map(item => (
            <li key={item._id} className={styles.li}>
              {item.number}
            </li>
          ))}
        </ul>
      </div>
      <p className="text text_type_main-medium">Выполнено за все время:</p>
      <span className="text text_type_digits-large mb-15">{totalOrders}</span>
      <p className="text text_type_main-medium">Выполнено за сегодня:</p>
      <span className="text text_type_digits-large">{totalOrdersToday}</span>
    </div>
  );
}

export default OrdersDashboard;

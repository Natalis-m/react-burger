import styles from './feed.module.css';
import OrdersFeed from '../../components/orders-feed/orders-feed';
import OrdersDashboard from '../../components/orders-dashboard/orders-dashboard';

export function Feed() {
  return (
    <section className={styles.section}>
      <h1 className={`${styles.title} text text_type_main-large`}>Лента заказов</h1>
      <OrdersFeed />
      <OrdersDashboard />
    </section>
  );
}

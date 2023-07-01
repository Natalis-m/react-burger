import styles from './feed.module.css';
import OrdersFeed from '../../components/orders-feed/orders-feed';
import OrdersDashboard from '../../components/orders-dashboard/orders-dashboard';
import { ModalState } from '../../model/modal-sate.model';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import Modal from '../../components/Modal/Modal';
import OrderInfo from '../../components/orders-info/order-info';
import { useAppSelector } from '../../hooks/useTyped';

export function Feed() {
  const { orders } = useAppSelector(state => state.ordersReducer.allOrders);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<ModalState>({
    modalCurrentOrder: false
  });

  const location = useLocation();
  const { number } = useParams<{ number: string }>();
  const currentOrderNumber = location.state && location.state.currentOrderNumber;

  useEffect(() => {
    if (currentOrderNumber && number) {
      setOpenModal({ modalCurrentOrder: true });
    }
  }, [currentOrderNumber, number]);

  return (
    <section className={styles.section}>
      <h1 className={`${styles.title} text text_type_main-large`}>Лента заказов</h1>
      <OrdersFeed />
      <OrdersDashboard />
      {openModal.modalCurrentOrder && number && (
        <Modal
          onClose={() => {
            setOpenModal({ modalCurrentOrder: false });
            navigate(-1);
          }}
        >
          <OrderInfo number={number} orders={orders} />
        </Modal>
      )}
    </section>
  );
}

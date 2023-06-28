import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useTyped';
import { OrderType } from '../../services/slices/ordersReducer';
import styles from './order-info.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import NotFound from '../../pages/NotFound';
import { getIngredientDetalis } from '../../utils/getIngredientDetalis';

export type paramsType = {
  number?: number;
  id?: string;
};

export function OrderInfo() {
  const { orders } = useAppSelector(state => state.ordersReducer.allOrders);

  const { number } = useParams<{ number: string }>();
  const elOrder = orders.find((el: OrderType) => el.number === +(number ?? ''));

  const allIngredients = useAppSelector(store => store.getIngredientsReducer.items);

  if (elOrder) {
    const { orderIngredients, orderSum } = getIngredientDetalis(
      elOrder.ingredients,
      allIngredients
    );

    const getStatusText = (status: string) => {
      switch (status) {
        case 'created':
          return 'Создан';
        case 'pending':
          return 'Готовится';
        case 'done':
          return 'Выполнен';
        default:
          return 'Неизвестен';
      }
    };

    return (
      <article className={styles.container}>
        <span className={`${styles.heading} text text_type_digits-default mb-10`}>
          #{elOrder.number}
        </span>
        <h2 className="text text_type_main-medium mb-3">{elOrder.name}</h2>
        <div className={`${styles.status} text text_type_main-default mb-15`}>
          {getStatusText(elOrder.status)}
        </div>
        <div className="text text_type_main-medium mb-6">Состав:</div>
        <div className={`${styles.main} mb-10 pr-6 custom-scroll pr-1`}>
          {orderIngredients.map(item => (
            <div className={styles.ingredient} key={item._id}>
              <div className={styles.preview}>
                <img src={item.image} className={styles.image} alt={item.name} />
              </div>
              <div className={`${styles.nameBlock} text text_type_main-default`}>
                <p className={styles.name}>{item.name}</p>
              </div>
              <div className={styles.total}>
                <div className="text text_type_digits-default">
                  {item.count} x {item.price}
                </div>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
          <div className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(elOrder.updatedAt)} />
          </div>

          <div className={styles.total}>
            <div className="text text_type_digits-default">{orderSum}</div>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </article>
    );
  } else {
    return <NotFound />;
  }
}

export default OrderInfo;

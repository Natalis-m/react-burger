import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useTyped';
import styles from './orders-feed-item.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredientDetalis } from '../../utils/getIngredientDetalis';

interface OrdersFeedItem {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
  displayStatus: boolean;
  nav: string;
}

function OrdersFeedItem({
  createdAt,
  ingredients,
  name,
  number,
  status,
  updatedAt,
  _id,
  displayStatus,
  nav
}: OrdersFeedItem) {
  const location = useLocation();
  const navigate = useNavigate();
  const allIngredients = useAppSelector(store => store.getIngredientsReducer.items);
  const { orderIngredients, orderSum } = getIngredientDetalis(ingredients, allIngredients);

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

  let previewIngredients = [];
  let restIngredients: number | null = null;
  if (orderIngredients.length > 10) {
    previewIngredients = orderIngredients.slice(0, 10);
    restIngredients = orderIngredients.length - 10;
  } else {
    previewIngredients = orderIngredients.slice();
  }

  const order = nav === 'feed' ? 'currentOrderNumber' : 'myOrderNumber';

  const openOrder = () => {
    navigate(`/${nav}/${number}`, { state: { [order]: location } });
  };

  return (
    <article onClick={openOrder} className={`${styles.container} p-6`}>
      <p className={styles.heading}>
        <span className="text text_type_digits-default">#{number}</span>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(updatedAt)} />
        </span>
      </p>
      <div>
        <div className="text text_type_main-medium">{name}</div>
        {displayStatus && (
          <span className="text text_type_main-default mt-2">{getStatusText(status)}</span>
        )}
      </div>
      <div className={styles.details}>
        <div className={styles.ingredients}>
          {previewIngredients.map((item, index) => (
            <div className={styles.preview} key={number + item._id + index}>
              <img src={item.image} className={styles.previewImage} alt={item.name} />
              {index === 10 && (
                <div
                  className={`${styles.ingredients} text text_type_main-default`}
                >{`+${restIngredients}`}</div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.cost}>
          <div className="text text_type_digits-default">{orderSum}</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </article>
  );
}

export default OrdersFeedItem;

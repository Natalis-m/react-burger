import { useAppSelector } from '../../hooks/useTyped';
import img from '../../images/done.png';
import Skeleton from './Skeleton';

function OrderDetails() {
  const orderNumber = useAppSelector(state => state.createdOrderReducer.order.number);
  return (
    <>
      {orderNumber > 0 ? (
        <div className="pt-20 pb-4 text text_type_digits-large">{orderNumber}</div>
      ) : (
        <Skeleton />
      )}
      <h3 className="text text_type_main-medium pt-4 pb-3">Идентификатор заказа</h3>
      <img src={img} className="pt-15 pb-8" />
      <p>Ваш заказ начали готовить</p>
      <p className="pb-10 text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

export default OrderDetails;

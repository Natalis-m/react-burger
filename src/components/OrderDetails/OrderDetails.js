import img from '../../images/done.png';
function OrderDetails() {
  return (
    <>
      <div className="pt-20 pb-4 text text_type_digits-large">12378</div>
      <h3 className="text text_type_main-medium pt-4 pb-3">Идентификатор заказа</h3>
      <img src={img} className="pt-15 pb-8" />
      <p>Ваш заказ начали готовить</p>
      <p className="pb-10 text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </>

    // </div>
  );
}

export default OrderDetails;

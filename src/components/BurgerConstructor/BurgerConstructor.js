import {
  ConstructorElement,
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import vecror from '../../images/vector.png';
import BurgerConstructorStyle from './BurgerConstructor.module.css';

function BurgerConstructor() {
  return (
    <section className="pt-25">
      <div>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          // thumbnail={img}
        />
        {/* <img src="<%=require('../images/vector.png')%>" /> */}
        <ul>{burgerConstructor()}</ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          // thumbnail={img}
        />
      </div>
      <div className={BurgerConstructorStyle.order + ' pt-10'}>
        <div>
          <span className="text text_type_digits-medium">600</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

function burgerConstructor() {
  return (
    <div>
      <img src={vecror} />
      <ConstructorElement
        text="Краторная булка N-200i (верх)"
        price={50}
        // thumbnail={img}
      />
    </div>
  );
}

export default BurgerConstructor;

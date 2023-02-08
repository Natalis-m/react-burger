import {
  ConstructorElement,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyle from './BurgerConstructor.module.css';

function BurgerConstructor(props) {
  const data = {
    name: 'Краторная булка N-200i',
    img: 'https://code.s3.yandex.net/react/code/bun-02.png',
    price: '100'
  };

  function burgerConstructor() {
    return (
      <li className={BurgerConstructorStyle.list + ' pt-4'}>
        <ConstructorElement text={data.name} price={data.price} thumbnail={data.img} />
      </li>
    );
  }

  return (
    <section className={BurgerConstructorStyle.container + ' mt-25'}>
      <div>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={data.name + ' (верх)'}
          price={data.price}
          thumbnail={data.img}
        />

        <ul className={BurgerConstructorStyle.burgerMain + ' custom-scroll pr-4 pb-4 pl-0'}>
          {burgerConstructor()}
        </ul>
      </div>
      <div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={data.name + ' (низ)'}
          price={data.price}
          thumbnail={data.img}
        />
        <div className={BurgerConstructorStyle.order + ' pt-10 pr-6'}>
          <div>
            <span className="text text_type_digits-medium">600</span>
            <CurrencyIcon type="primary" />
          </div>
          {props.children}
          {/* <Button htmlType="button" type="primary" size="medium">
            Оформить заказ
          </Button> */}
        </div>
      </div>
    </section>
  );
}

export default BurgerConstructor;

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import BurgerConstructorStyle from './BurgerConstructor.module.css';
import { setStateModal } from '../../services/slices/modalStateSlise';
import { addModalOrder } from '../../services/slices/modalStateSlise';
import ElementFilling from '../BurgerElement/ElementFilling';
import ElementBun from '../BurgerElement/ElementBun';
import { addFilling } from '../../services/slices/burgerConstructorSlice';
import { sendBurger } from '../../services/slices/createdOrderSlise';

function BurgerConstructor() {
  const dispatch = useDispatch();

  function openModal() {
    dispatch(setStateModal(true));
    dispatch(addModalOrder(true));
  }

  const { filling, bun } = useSelector(state => state.burgerConstructorReducer);

  const [{}, dropFilling] = useDrop({
    accept: 'filling',
    drop: item => dispatch(addFilling(item))
  });

  const arrPriceIngredient = filling.map(ingredient => ingredient.price).concat(bun.price * 2);

  function priseBurger(arr) {
    let sum = 0;
    arr.forEach(item => {
      sum += item;
    });
    return sum;
  }

  const renderCard = useCallback((ingredient, i) => {
    return <ElementFilling {...ingredient} key={ingredient.id} index={i} />;
  }, []);

  const sendOrder = () => {
    let arrIngredientId = filling.map(i => i._id).concat(bun._id);
    dispatch(sendBurger(arrIngredientId));
    openModal();
  };

  return (
    <section className={BurgerConstructorStyle.container + ' mt-25'}>
      <ElementBun item="верх" type="top" />
      <div>
        <ul
          ref={dropFilling}
          className={BurgerConstructorStyle.burgerMain + ' custom-scroll pr-4 pb-4 pl-0'}
        >
          {filling.map((ingredient, i) => renderCard(ingredient, i))}
        </ul>
      </div>
      <ElementBun item="низ" type="bottom" />
      <div className={BurgerConstructorStyle.order + ' pt-10 pr-6'}>
        <div>
          <span className="text text_type_digits-medium">{priseBurger(arrPriceIngredient)}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={sendOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;

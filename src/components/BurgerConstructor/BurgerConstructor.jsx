import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import BurgerConstructorStyle from './BurgerConstructor.module.css';
import ElementFilling from '../BurgerElement/ElementFilling';
import ElementBun from '../BurgerElement/ElementBun';
import { addFilling, clearConstructor } from '../../services/slices/burgerConstructorSlice';
import { sendBurger } from '../../services/slices/createdOrderSlice';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function BurgerConstructor({ openModal }) {
  const dispatch = useDispatch();
  const { filling, bun } = useSelector(state => state.burgerConstructorReducer);
  const arrPriceIngredient = filling.map(ingredient => ingredient.price).concat(bun.price * 2);

  const renderCard = useCallback((ingredient, i) => {
    return <ElementFilling {...ingredient} key={ingredient.id} index={i} />;
  }, []);

  const [{}, dropFilling] = useDrop({
    accept: 'filling',
    drop: item => dispatch(addFilling(item))
  });

  function priseBurger(arr) {
    let sum = 0;
    arr.forEach(item => {
      sum += item;
    });
    return sum;
  }
  let isUserLoaded = useSelector(state => state.userReducer.user.name);
  console.log('isUserLoaded?', isUserLoaded);

  const navigate = useNavigate();

  const sendOrder = () => {
    let arrIngredientId = filling.map(i => i._id).concat(bun._id);

    if (isUserLoaded) {
      if (bun.name === 'добавьте булку') {
        alert('Добавьте булку');
      } else {
        dispatch(sendBurger(arrIngredientId));
        openModal({ modalOrder: true });
        dispatch(clearConstructor());
      }
    } else {
      navigate('/login');
    }
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

BurgerConstructor.propTypes = {
  openModal: PropTypes.func
};

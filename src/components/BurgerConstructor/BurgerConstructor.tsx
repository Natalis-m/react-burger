import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import BurgerConstructorStyle from './BurgerConstructor.module.css';
import ElementFilling from '../BurgerElement/ElementFilling';
import ElementBun from '../BurgerElement/ElementBun';
import { addFilling, clearConstructor } from '../../services/slices/burgerConstructorSlice';
import { sendBurger } from '../../services/slices/createdOrderSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useTypedSelector } from '../../hooks/useTyped';
import { Ingredient } from '../../model/ingredient.model';
import { ModalState } from '../../model/modal-sate.model';

interface burgerConstructorProps {
  setOpenModal: React.Dispatch<React.SetStateAction<ModalState>>;
}

function BurgerConstructor({ setOpenModal }: burgerConstructorProps) {
  const dispatch = useAppDispatch();
  const { filling, bun } = useTypedSelector(state => state.burgerConstructorReducer);
  const arrPriceIngredient: Array<number> = filling
    .map((ingredient: Ingredient) => ingredient.price)
    .concat(bun.price * 2);

  const renderCard = useCallback((ingredient: Ingredient, i: number) => {
    return <ElementFilling {...ingredient} key={ingredient._id} index={i} />;
  }, []);

  const [{}, dropFilling]: [any, any] = useDrop({
    accept: 'filling',
    drop: item => dispatch(addFilling(item))
  });

  function priceBurger(arr: Array<number>) {
    let sum = 0;
    arr.forEach(item => {
      sum += item;
    });
    return sum;
  }
  const isUserLoaded = useTypedSelector(state => state.userReducer);

  const navigate = useNavigate();
  const location = useLocation();

  const sendOrder = () => {
    const arrIngredientId = filling.map(i => i._id).concat(bun._id);

    if (isUserLoaded.user.name) {
      if (bun.name === 'добавьте булку') {
        alert('Добавьте булку');
      } else {
        dispatch(sendBurger(arrIngredientId));
        setOpenModal({ modalOrder: true });
        dispatch(clearConstructor());
      }
    } else {
      navigate('/login', { state: { from: location } });
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
          <span className="text text_type_digits-medium">{priceBurger(arrPriceIngredient)}</span>
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

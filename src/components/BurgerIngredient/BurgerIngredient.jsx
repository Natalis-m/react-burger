import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientStyle from './BurgerIngredient.module.css';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function BurgerIngredient({ _id, drag, type, onClick, image, name, price }) {
  const { filling, bun } = useSelector(state => state.burgerConstructorReducer);
  const [, dragRef] = useDrag({
    type: drag,
    item: { _id, name, price, image }
  });

  const renderCauntIngredient = () => {
    return (
      <span
        className={BurgerIngredientStyle.calculator + ' text text_type_digits-default mt-0 mb-0'}
      >
        {bun._id === _id ? 2 : filling.filter(elem => elem._id === _id).length || ''}
      </span>
    );
  };

  return (
    <article
      id={_id}
      ref={dragRef}
      draggable={true}
      type={type}
      onClick={onClick}
      className={BurgerIngredientStyle.card + ' pl-4 mt-6'}
    >
      <img src={image} alt={name} className={BurgerIngredientStyle.img + ' pl-4 pr-4'} />

      {renderCauntIngredient()}
      <div className={BurgerIngredientStyle.info + ' pt-1 pb-1'}>
        <span className="text text_type_digits-default">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <span className={BurgerIngredientStyle.info + ' text text_type_main-default'}>{name}</span>
    </article>
  );
}

export default BurgerIngredient;

BurgerIngredient.propTypes = {
  _id: PropTypes.string,
  drag: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string
};

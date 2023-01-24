import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientStyle from './BurgerIngredient.module.css';

function BurgerIngredient(props) {
  const { name, price, image, type } = props;
  return (
    <article type={type} className={BurgerIngredientStyle.card + ' pl-4'}>
      <img src={image} alt={name} className={BurgerIngredientStyle.img + ' pl-4 pr-4'} />
      <span className={BurgerIngredientStyle.calculator + ' text text_type_digits-default'}>1</span>
      <div className={BurgerIngredientStyle.info + ' pt-1 pb-1'}>
        <span className="text text_type_digits-default">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <span className="text text_type_main-default">{name}</span>
    </article>
  );
}

export default BurgerIngredient;

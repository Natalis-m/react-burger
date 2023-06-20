import { useTypedSelector } from '../../hooks/useTypedSelector';
import IngredientStyle from './IngredientDetails.module.css';

export default function IngredientDetails({ id }) {
  const arrIngredients = useTypedSelector(state => state.getIngredientsReducer.items);

  const elementIngredient = arrIngredients.find(element => element._id === id);

  if (elementIngredient) {
    return (
      <div className={IngredientStyle.content}>
        <h2 className={IngredientStyle.title + ' text text_type_main-large pt-3 pb-3'}>
          Детали ингредиента
        </h2>
        <img
          src={elementIngredient.image}
          alt={elementIngredient.name}
          className={IngredientStyle.img}
        />
        <span className="text text_type_main-medium pt-4">{elementIngredient.name}</span>
        <ul
          className={
            IngredientStyle.infomation +
            ' pt-8 pb-4 text text_type_main-default text_color_inactive'
          }
        >
          <li>
            Калории, ккал{' '}
            <span className="text text_type_digits-default">{elementIngredient.calories}</span>
          </li>
          <li>
            Белки, г{' '}
            <span className="text text_type_digits-default">{elementIngredient.proteins}</span>
          </li>
          <li>
            Жиры, г <span className="text text_type_digits-default">{elementIngredient.fat}</span>
          </li>
          <li>
            Углеводы, г{' '}
            <span className="text text_type_digits-default">{elementIngredient.carbohydrates}</span>
          </li>
        </ul>
      </div>
    );
  }
}

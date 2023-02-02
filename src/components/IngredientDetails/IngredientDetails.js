import IngredientStyle from './IngredientDetails.module.css';

const IngredientDetails = props => {
  const { image, name, calories, proteins, carbohydrates, fat } = props;
  console.log(props);
  return (
    <div className={IngredientStyle.content}>
      <h2 className="text text_type_main-large pt-3 pb-3" style={{ alignSelf: 'flex-start' }}>
        Детали ингредиента
      </h2>
      <img src={image} alt={name} className={IngredientStyle.img} />
      <span className="text text_type_main-medium pt-4">{name}</span>
      <ul
        className={
          IngredientStyle.infomation + ' pt-8 pb-4 text text_type_main-default text_color_inactive'
        }
      >
        <li>
          Калории, ккал <span className="text text_type_digits-default">{calories}</span>
        </li>
        <li>
          Белки, г <span className="text text_type_digits-default">{proteins}</span>
        </li>
        <li>
          Жиры, г <span className="text text_type_digits-default">{fat}</span>
        </li>
        <li>
          Углеводы, г <span className="text text_type_digits-default">{carbohydrates}</span>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;

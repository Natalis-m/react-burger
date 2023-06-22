import { useTypedSelector } from '../../hooks/useTyped';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

const ModalIngredient = () => {
  const { id } = useTypedSelector(state => state.currentIngredientReducer);

  return <IngredientDetails id={id} />;
};

export default ModalIngredient;

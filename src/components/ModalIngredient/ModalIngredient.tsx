import { useAppSelector } from '../../hooks/useTyped';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

const ModalIngredient = () => {
  const { id } = useAppSelector(state => state.currentIngredientReducer);

  return <IngredientDetails id={id} />;
};

export default ModalIngredient;

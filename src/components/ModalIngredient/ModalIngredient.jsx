import { useSelector } from 'react-redux';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

const ModalIngredient = () => {
  const { id } = useSelector(state => state.currentIngredientReducer);
  return <IngredientDetails id={id} />;
};

export default ModalIngredient;

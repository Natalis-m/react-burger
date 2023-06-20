import { useParams } from 'react-router-dom';
import Style from './PageIngredient.module.css';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';

function PageIngredient() {
  const { id } = useParams();

  return (
    <section className={Style.body}>
      <IngredientDetails id={id} />
    </section>
  );
}

export default PageIngredient;

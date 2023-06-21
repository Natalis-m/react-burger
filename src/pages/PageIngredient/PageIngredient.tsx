import { useParams } from 'react-router-dom';
import Style from './PageIngredient.module.css';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import NotFound from '../NotFound';

function PageIngredient() {
  const { id } = useParams<{ id: string }>();
  if (id) {
    return (
      <section className={Style.body}>
        <IngredientDetails id={id} />
      </section>
    );
  } else {
    return <NotFound />;
  }
}

export default PageIngredient;

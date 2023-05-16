import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Style from './HomeStyle.module.css';
import BurgerIngredients from '../../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../BurgerConstructor/BurgerConstructor';

function Home() {
  return (
    <div className={Style.content}>
      <DndProvider backend={HTML5Backend}>
        {/* <BurgerIngredients openModal={setOpenModal} />
      <BurgerConstructor openModal={setOpenModal} /> */}
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </div>
  );
}

export default Home;

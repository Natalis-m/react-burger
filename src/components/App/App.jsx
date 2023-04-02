import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import AppHeader from '../AppHeader/AppHeader';
import AppStyle from './App.module.css';
import Modal from '../Modal/Modal';

function App() {
  return (
    <div className={AppStyle.App}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={AppStyle.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
      <Modal />
    </div>
  );
}

export default App;

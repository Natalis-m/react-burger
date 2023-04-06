import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import AppHeader from '../AppHeader/AppHeader';
import AppStyle from './App.module.css';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

function App() {
  const [openModal, setOpenModal] = useState({ modalIngredient: false, modalOrder: false });

  return (
    <div className={AppStyle.App}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={AppStyle.main}>
          <BurgerIngredients openModal={setOpenModal} />
          <BurgerConstructor openModal={setOpenModal} />
        </main>
      </DndProvider>
      {openModal.modalIngredient && (
        <Modal onClose={() => setOpenModal({ modalIngredient: false })}>
          <IngredientDetails />
        </Modal>
      )}
      {openModal.modalOrder && (
        <Modal onClose={() => setOpenModal({ modalOrder: false })}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;

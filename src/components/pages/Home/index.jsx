import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
import Style from './HomeStyle.module.css';
import BurgerIngredients from '../../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../BurgerConstructor/BurgerConstructor';
import ModalIngredient from '../../ModalIngredient/ModalIngredient';
import OrderDetails from '../../OrderDetails/OrderDetails';
import Modal from '../../Modal/Modal';

function Home() {
  const [openModal, setOpenModal] = useState({ modalIngredient: false, modalOrder: false });

  return (
    <div className={Style.content}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients openModal={setOpenModal} />
        <BurgerConstructor openModal={setOpenModal} />
      </DndProvider>
      {openModal.modalIngredient && (
        <Modal onClose={() => setOpenModal({ modalIngredient: false })}>
          <ModalIngredient />
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

export default Home;

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState, useEffect } from 'react';
import Style from './HomeStyle.module.css';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import ModalIngredient from '../../components/ModalIngredient/ModalIngredient';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import Modal from '../../components/Modal/Modal';
import { useLocation, Outlet, useParams, useNavigate } from 'react-router-dom';
import { changeDetailsIngredient } from '../../services/slices/currentIngredientSlice';
import { useAppDispatch } from '../../hooks/useTyped';
import { ModalState } from '../../model/modal-sate.model';

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const background = location.state && location.state.background;

  const [openModal, setOpenModal] = useState<ModalState>({
    modalIngredient: false,
    modalOrder: false
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (background && id) {
      dispatch(changeDetailsIngredient(id));
      setOpenModal({ modalIngredient: true });
    }
  }, [background, id]);

  return (
    <div className={Style.content}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor setOpenModal={setOpenModal} />
      </DndProvider>
      <Outlet />
      {openModal.modalIngredient && (
        <Modal
          onClose={() => {
            setOpenModal({ modalIngredient: false });
            navigate(-1);
          }}
        >
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

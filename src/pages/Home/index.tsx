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
import { useDispatch, useSelector } from 'react-redux';

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const background = location.state && location.state.background;

  const [openModal, setOpenModal] = useState({ modalIngredient: false, modalOrder: false });

  const dispatch = useDispatch();

  useEffect(() => {
    if (background && id) {
      dispatch(changeDetailsIngredient(id));
      setOpenModal({ modalIngredient: true });
    }
  }, [background, id]);

  return (
    <div className={Style.content}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients openModal={setOpenModal} />
        <BurgerConstructor openModal={setOpenModal} />
      </DndProvider>
      <Outlet />
      {openModal.modalIngredient && (
        <Modal
          onClose={() => {
            setOpenModal({ modalIngredient: false });
            navigate('/');
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

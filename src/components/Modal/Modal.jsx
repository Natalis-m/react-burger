import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyle from './Modal.module.css';
import {
  setStateModal,
  addModalIngredient,
  addModalOrder
} from '../../services/slices/modalStateSlise';

const modalElement = document.querySelector('#modal');

const Modal = () => {
  const dispatch = useDispatch();
  const element = document.createElement('div');
  const { modalIngredient, modalOrder, opened } = useSelector(state => state.modalStateReduser);

  useEffect(() => {
    if (opened) {
      modalElement.appendChild(element);
      return () => {
        modalElement.removeChild(element);
      };
    }
  }, [element]);

  function modalClosed() {
    dispatch(setStateModal(false));
    dispatch(addModalIngredient(false));
    dispatch(addModalOrder(false));
  }

  const closedModalEsc = event => {
    if (event.key === 'Escape' && opened) {
      modalClosed();
    }
  };

  document.addEventListener('keydown', closedModalEsc);

  return createPortal(
    <section className={modalStyle.modal} onClick={() => modalClosed()}>
      <div
        className={modalStyle.content + ' pt-10 pr-10 pb-10 pl-10'}
        onClick={e => e.stopPropagation()}
      >
        <div className={modalStyle.closed} onClick={() => modalClosed()}>
          <CloseIcon type="primary" />
        </div>
        {modalIngredient && <IngredientDetails />}
        {modalOrder && <OrderDetails />}
      </div>
    </section>,
    element
  );
};

export default Modal;

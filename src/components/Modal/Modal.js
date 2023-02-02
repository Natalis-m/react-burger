import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import modalStyle from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalElement = document.querySelector('#modal');
const Modal = props => {
  const { active, inActive, content } = props;
  console.log(props);
  const element = document.createElement('div');

  useEffect(() => {
    if (active) {
      modalElement.appendChild(element);
      return () => {
        modalElement.removeChild(element);
      };
    }
  }, [element]);

  if (active) {
    return createPortal(
      <section className={modalStyle.modal} onClick={inActive}>
        <div
          className={modalStyle.content + ' pt-10 pr-10 pb-10 pl-10'}
          onClick={e => e.stopPropagation()}
        >
          <div className={modalStyle.closed} onClick={inActive}>
            <CloseIcon type="primary" />
          </div>
          {content()}
        </div>
      </section>,
      element
    );
  }
  return null;
};

export default Modal;

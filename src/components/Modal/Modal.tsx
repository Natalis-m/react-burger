import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyle from './Modal.module.css';

const modalElement = document.querySelector('#modal') ?? new DocumentFragment();

interface modalProps {
  onClose: () => void;
  children: JSX.Element;
}

const Modal = ({ onClose, children }: modalProps) => {
  useEffect(() => {
    function closeByEscape(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape);
    return () => {
      document.removeEventListener('keydown', closeByEscape);
    };
  }, []);

  return createPortal(
    <section className={modalStyle.modal} onClick={() => onClose()}>
      <div
        className={modalStyle.content + ' pt-10 pr-10 pb-10 pl-10'}
        onClick={e => e.stopPropagation()}
      >
        <div className={modalStyle.closed} onClick={() => onClose()}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </section>,
    modalElement
  );
};

export default Modal;

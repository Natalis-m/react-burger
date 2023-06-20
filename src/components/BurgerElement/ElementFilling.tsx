import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { deletIngredient, setFilling } from '../../services/slices/burgerConstructorSlice';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Style from './ElementFilling.module.css';
import PropTypes from 'prop-types';
import { useAppDispatch, useTypedSelector } from '../../hooks/useTypedSelector';

function ElementFilling({ _id, name, price, image, index }) {
  const dispatch = useAppDispatch();
  const filling = useTypedSelector(state => state.burgerConstructorReducer.filling);

  const removeIngredient = () => {
    const finedIndex = filling.findIndex(item => item._id === _id);

    if (finedIndex === -1) {
      return;
    }

    const newArrFilling = filling
      .slice(0, finedIndex)
      .concat(filling.slice(finedIndex + 1, filling.length));
    dispatch(deletIngredient(newArrFilling));
  };

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'sorting',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (!ref.current) {
        return;
      }

      if (dragIndex === hoverIndex) {
        return;
      }

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(setFilling({ from: dragIndex, to: hoverIndex }));
      item.index = hoverIndex;
    }
  });

  const [, drag] = useDrag({
    type: 'sorting',
    item: { name, index }
  });
  drag(drop(ref));

  return (
    <li
      ref={ref}
      className={Style.element + ' pt-4'}
      draggable={true}
      index={index}
      data-handler-id={handlerId}
    >
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={removeIngredient}
      />
    </li>
  );
}

export default ElementFilling;

ElementFilling.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  index: PropTypes.number
};

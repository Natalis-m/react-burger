import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { deletIngredient, setFilling } from '../../services/slices/burgerConstructorSlice';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Style from './ElementFilling.module.css';
import { useAppDispatch, useTypedSelector } from '../../hooks/useTyped';

interface elementFillingProps {
  _id: string;
  name: string;
  price: number;
  image: string;
  index: number;
}

function ElementFilling({ _id, name, price, image, index }: elementFillingProps) {
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

  const ref = useRef<HTMLLIElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'sorting',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item: any, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = ((hoverBoundingRect?.bottom ?? 0) - (hoverBoundingRect?.top ?? 0)) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset?.y ?? 0) - (hoverBoundingRect?.top ?? 0);

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
      data-index={index}
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

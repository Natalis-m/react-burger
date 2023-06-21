import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { setBun } from '../../services/slices/burgerConstructorSlice';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useTypedSelector } from '../../hooks/useTyped';

interface elementBunProps {
  type: 'top' | 'bottom';
  item: 'верх' | 'низ';
}

function ElementBun({ type, item }: elementBunProps) {
  const dispatch = useAppDispatch();
  const bun = useTypedSelector(state => state.burgerConstructorReducer.bun);

  const [{}, dropBun]: [any, any] = useDrop({
    accept: 'bun',
    drop: item => {
      dispatch(setBun(item));
    }
  });
  return (
    <div ref={dropBun}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={bun.name + ` (${item})`}
        price={bun.price}
        thumbnail={bun.image}
      />
    </div>
  );
}

export default ElementBun;

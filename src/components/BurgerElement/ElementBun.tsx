import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { setBun } from '../../services/slices/burgerConstructorSlice';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { useTypedSelector } from '../../hooks/useTypedSelector';

function ElementBun({ type, item }) {
  const dispatch = useDispatch();
  const bun = useTypedSelector(state => state.burgerConstructorReducer.bun);

  const [{}, dropBun] = useDrop({
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

ElementBun.propTypes = {
  type: PropTypes.string,
  item: PropTypes.string
};

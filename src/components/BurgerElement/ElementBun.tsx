import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { setBun } from '../../services/slices/burgerConstructorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

function ElementBun({ type, item }) {
  const dispatch = useDispatch();
  const bun = useSelector(state => state.burgerConstructorReducer.bun);

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

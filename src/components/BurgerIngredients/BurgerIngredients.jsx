import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientStyle from './BurgerIngredients.module.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import { setStateModal, addModalIngredient } from '../../services/slices/modalStateSlise';
import { changeDetailsIngredient } from '../../services/slices/currentIngredientSlice';
import { fetchIngredients } from '../../services/slices/getIngredientsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Skeleton from '../BurgerIngredient/Skeleton';
import { arrData } from '../../utils/ui';
import { useInView } from 'react-intersection-observer';

function BurgerIngredients() {
  const skeletons = [...new Array(2)].map((_, index) => <Skeleton key={index} />);
  const { items, status } = useSelector(state => state.getIngredientsReducer);
  const [current, setCurrent] = useState('bun');

  const dispatch = useDispatch();

  function getIngredient(typeIngredient, dragType) {
    return items
      .filter(data => data.type === typeIngredient)
      .map(data => {
        return (
          <BurgerIngredient
            onClick={() => {
              dispatch(changeDetailsIngredient({ ...data }));
              dispatch(setStateModal(true));
              dispatch(addModalIngredient(true));
            }}
            drag={dragType}
            draggable={true}
            key={data._id}
            {...data}
          />
        );
      });
  }

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  const handleTabClick = current => {
    setCurrent(current);
    document.getElementById(current).scrollIntoView({ block: 'start' });
  };

  const navigation = () => {
    return arrData.map(i => {
      return (
        <Tab value={i.type} active={current === i.type} onClick={handleTabClick}>
          {i.title}
        </Tab>
      );
    });
  };

  const [refBun, inViewBuns] = useInView();
  const [refMain, inViewMain] = useInView();
  const [refSauce, inViewSauce] = useInView();

  useEffect(() => {
    if (inViewBuns) {
      setCurrent('bun');
    } else if (inViewSauce) {
      setCurrent('sauce');
    } else if (inViewMain) {
      setCurrent('main');
    }
  }, [inViewBuns, inViewMain, inViewSauce]);

  const createBlockIngredients = () => {
    return arrData.map(i => {
      return (
        <article
          key={i.type}
          className={BurgerIngredientStyle.section}
          ref={
            i.type === 'bun'
              ? refBun
              : i.type === 'sauce'
              ? refSauce
              : i.type === 'main'
              ? refMain
              : undefined
          }
        >
          <h2
            className={BurgerIngredientStyle.typeIngredient + ' pt-10 text text_type_main-medium'}
            id={i.type}
          >
            {i.title}
          </h2>
          {status === 'loading'
            ? skeletons
            : i.type === 'bun'
            ? getIngredient(i.type, 'bun')
            : getIngredient(i.type, 'filling')}
        </article>
      );
    });
  };

  return (
    <section className={BurgerIngredientStyle.box}>
      <h1 className="text text_type_main-large pb-5 pt-10">Соберите бургер</h1>
      <div className={BurgerIngredientStyle.nav}>{navigation()}</div>
      <section
        id="sectionIngredients"
        className={BurgerIngredientStyle.ingredients + ' custom-scroll pr-1'}
      >
        {createBlockIngredients()}
      </section>
    </section>
  );
}

export const { setCount } = BurgerIngredients;

export default BurgerIngredients;
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientStyle from './BurgerIngredients.module.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import { useState, useEffect } from 'react';
import Skeleton from '../BurgerIngredient/Skeleton';
import { arrData } from '../../utils/ui';
import { useInView } from 'react-intersection-observer';
import { useLocation, Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Ingredient, IngredientType } from '../../model/ingredient.model';

const BurgerIngredients = () => {
  const location = useLocation();
  const [refBun, inViewBuns] = useInView();
  const [refMain, inViewMain] = useInView();
  const [refSauce, inViewSauce] = useInView();
  const [current, setCurrent] = useState('bun');

  const skeletons = [...new Array(2)].map((_, index) => <Skeleton key={index} />);
  const { items, status } = useTypedSelector(state => state.getIngredientsReducer);

  const getIngredient = (typeIngredient: IngredientType, dragType: any) => {
    return items
      .filter((dataIngredient: Ingredient) => dataIngredient.type === typeIngredient)
      .map((dataIngredient: Ingredient) => {
        return (
          <Link
            key={dataIngredient._id}
            to={{
              pathname: `/ingredients/${dataIngredient._id}`
            }}
            state={{ background: location }}
          >
            <BurgerIngredient
              drag={dragType}
              draggable={true}
              key={dataIngredient._id}
              {...dataIngredient}
            />
          </Link>
        );
      });
  };

  const handleTabClick = (currentIngredientType: string) => {
    setCurrent(currentIngredientType);
    document.getElementById(currentIngredientType)?.scrollIntoView({ block: 'start' });
  };

  const navigation = () => {
    return arrData.map(i => {
      return (
        <li key={i.type}>
          <Tab value={i.type} active={current === i.type} onClick={handleTabClick}>
            {i.title}
          </Tab>
        </li>
      );
    });
  };

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
      <ul className={BurgerIngredientStyle.nav}>{navigation()}</ul>
      <section
        id="sectionIngredients"
        className={BurgerIngredientStyle.ingredients + ' custom-scroll pr-1'}
      >
        {createBlockIngredients()}
      </section>
    </section>
  );
};

export default BurgerIngredients;
